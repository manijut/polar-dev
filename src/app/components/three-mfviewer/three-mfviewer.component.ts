import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { ThreeMFLoader } from "three/examples/jsm/loaders/3MFLoader.js"

@Component({
  selector: 'app-threejs-viewer',
  template: '<canvas #rendererCanvas></canvas>',
  styles: ['canvas { width: 100%; height: 100% }'],
})
export class ThreeMFViewerComponent implements OnInit, AfterViewInit {
  @ViewChild('rendererCanvas', { static: true })
  private rendererCanvas!: ElementRef;

  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private controls!: OrbitControls;

  constructor() {}

  ngOnInit() {
    // Initialize scene and camera
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.z = 5;
  }

  ngAfterViewInit() {
    this.initThree();
    this.load3MFFile('../../../assets/Axolotl_Multicolor.3mf'); // Update with your 3MF path
    this.animate();
  }

  private initThree() {
    // Initialize renderer
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.rendererCanvas.nativeElement,
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    // Set up scene background color
    this.scene.background = new THREE.Color(0xcccccc);

    // Add orbit controls
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0x404040); // Ambient light
    this.scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5); // Directional light
    this.scene.add(directionalLight);
  }

  private load3MFFile(filePath: string) {
    const loader = new ThreeMFLoader();

    loader.load(
      filePath,
      (object) => {
        // Enhanced error handling for missing mesh data
        try {
          console.log('Loaded 3MF object:', object);

          // Traverse the object tree and extract geometry
          object.traverse((child: THREE.Object3D) => {
            if (child instanceof THREE.Mesh) {
              const geometry = child.geometry;
              console.log('Extracted geometry:', geometry);

              // Add the geometry as a wireframe or another representation
              const wireframe = new THREE.WireframeGeometry(geometry);
              const line = new THREE.LineSegments(wireframe);
              this.scene.add(line);
            }
          });

          // Center the object in the scene
          const box = new THREE.Box3().setFromObject(object);
          const center = box.getCenter(new THREE.Vector3());
          object.position.sub(center);
        } catch (error) {
          console.error('Error while processing 3MF object:', error);
        }
      },
      (xhr) => {
        console.log(`3MF File: ${(xhr.loaded / xhr.total) * 100}% loaded`);
      },
      (error) => {
        console.error('Error loading 3MF file:', error);
      }
    );
  }

  private animate() {
    requestAnimationFrame(() => this.animate());
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }
}
