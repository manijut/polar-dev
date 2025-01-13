import { Component, OnInit } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
import { TransformControls } from 'three/examples/jsm/controls/TransformControls';
import { LoadingManager } from 'three';
import { clone } from 'lodash';
import { PRINTER_CONFIG, FILE } from './constant';
import { RotationalTestingService } from './rotational-testing.service';

@Component({
  selector: 'app-rotational-testing',
  templateUrl: './rotational-testing.component.html',
  styleUrls: ['./rotational-testing.component.scss'],
})
export class RotationalTestingComponent implements OnInit {
  container!: HTMLElement | null;
  scene!: THREE.Scene;
  material: any;
  stlLoader!: STLLoader;
  objLoader!: OBJLoader;
  manager!: LoadingManager;
  renderer = new THREE.WebGLRenderer({ antialias: true });
  camera!: THREE.PerspectiveCamera;
  light1!: THREE.DirectionalLight;
  light2!: THREE.DirectionalLight;
  orbitControl!: OrbitControls;
  transformControl!: TransformControls;
  raycaster = new THREE.Raycaster();
  selectedObject: any = {};
  bboxOfSelectedObject: any = {};
  restricted: boolean = false;
  hasRestrictedObject: boolean = false;
  constructor(private rotationalTestingService: RotationalTestingService) {}

  ngOnInit(): void {
    this.init();
    this.animate();
  }

  private init() {
    this.container = document.getElementById('build-plate-canvas');
    // RENDERER
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      preserveDrawingBuffer: true,
    });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setClearColor(0xffffff, 0.5);
    this.renderer.setSize(
      this.container?.offsetWidth ?? 0,
      this.container?.offsetHeight ?? 0
    );
    this.renderer.sortObjects = false;
    if (this.container) {
      this.container.appendChild(this.renderer.domElement);
    }

    // CAMERA
    this.camera = new THREE.PerspectiveCamera(
      50,
      (this.container?.offsetWidth ?? 1) / (this.container?.offsetHeight ?? 1),
      1,
      700
    );
    this.camera.position.set(-90, -90, 75);
    this.camera.up = new THREE.Vector3(0, 0, 1);
    this.scene = new THREE.Scene();

    // LIGHTS
    this.light1 = new THREE.DirectionalLight(0xefefff, 4);
    this.light2 = new THREE.DirectionalLight(0xefefff, 4);

    this.lightUpdate();
    this.scene.add(this.light1);
    this.scene.add(this.light2);

    this.addEventListeners();

    // ORBITAL CONTROL
    this.orbitControl = new OrbitControls(
      this.camera,
      this.renderer.domElement
    );
    this.orbitControl.maxDistance = 500;
    this.orbitControl.enablePan = false;
    this.orbitControl.addEventListener('change', () => this.lightUpdate());

    // MATERIAL
    this.material = new THREE.MeshPhongMaterial({
      color: 0x106cc8,
      specular: 0xc0c0c,
      shininess: 40,
      emissive: 0x000000,
    });

    // TRANSFORM CONTROLS
    this.transformControl = new TransformControls(
      this.camera,
      this.renderer.domElement
    );
    this.transformControl.addEventListener('mouseUp', (event) => {
      this.onTransformControlChange(event);
    });
    this.transformControl.addEventListener('mouseDown', (event) => {
      // this.removeBoundingBox();
      this.orbitControl.enabled = false;
    });
    this.scene.add(this.transformControl);

    this.drawBuildPlate();

    // LOADER
    this.manager = new THREE.LoadingManager();
    this.manager.onLoad = () => {};
    // IF LOADING MANAGER THROW ERROR
    this.manager.onError = () => {};
    // STL, OBJ, GCODE ,3MF LOADER INITIALIZE HERE
    this.stlLoader = new STLLoader(this.manager);
    this.objLoader = new OBJLoader(this.manager);

    //FILE LOAD TO BUILD PLATE
    this.loadSTL(FILE);
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));
    // TODO CHECK ALTERNATIVE OF TRANSFORM CONTROL UPDATE()

    if (this.transformControl) this.transformControl.updateMatrix();
    this.orbitControl.update();
    this.renderer.render(this.scene, this.camera);
  }

  lightUpdate() {
    let light1Clone = clone(this.camera.position);
    let light2Clone = clone(this.camera.position);
    light1Clone.x -= 25;
    light2Clone.x += 25;
    this.light1.position.copy(light1Clone);
    this.light2.position.copy(light2Clone);
  }

  //DRAW BUILD PLATE
  drawBuildPlate() {
    var config = PRINTER_CONFIG;
    //SETUP BUILD PALTE BASED OFF CONFIG
    if (!config || config?.physical_components?.rectangular_plate) {
      // DEFAULT BUILD PLATE

      // GRID
      var size_x, size_y;
      if (config) {
        size_x = config.offsets.width_mm || 200;
        size_y = config.offsets.length_mm || 200;
      } else {
        size_x = size_y = 200;
      }
      //RECTANGULAR BUILD PLATE
      var grid = this.rotationalTestingService.drawRectGrid(
        size_x / 2,
        size_y / 2,
        5,
        0x71d3f7,
        0xc6e8f4,
        0x0000ff
      );
      grid.rotation.x = 90 * (Math.PI / 180);
      this.scene.add(grid);
    } else if (config?.physical_components?.circular_plate) {
      // CIRCULAR BUILD PLATE
      // DRAW GRID IN CIRCLE
      let circularGrid;
      circularGrid = this.rotationalTestingService.drawCircularGrid(
        (config.offsets.radius_mm ?? 0) - 1,
        5,
        { color: 0xc6e8f4 }
      );
      this.scene.add(circularGrid);

      circularGrid = this.rotationalTestingService.drawCircularGrid(
        (config.offsets.radius_mm ?? 0) - 1,
        25,
        { color: 0x71d3f7 }
      );
      this.scene.add(circularGrid);

      // DRAW BUILD PLATE CIRCLE
      circularGrid = this.rotationalTestingService.drawCircle(
        config.offsets.radius_mm ?? 0,
        {
          color: 0x71d3f7,
        }
      );
      this.scene.add(circularGrid);
      circularGrid = this.rotationalTestingService.drawCircle(
        config.offsets.radius_mm ?? 0 - 1,
        {
          color: 0x71d3f7,
        }
      );
      this.scene.add(circularGrid);

      // DRAW CENTER CIRCLE
      circularGrid = this.rotationalTestingService.drawCircle(2.5, {
        color: 0x0000ff,
      });
      this.scene.add(circularGrid);
    }
  }

  // LOAD OBJECT TO BUILD PLATE
  loadSTL(obj: any = {}) {
    console.log(obj);
    return new Promise((resolve, reject) => {
      // STL LOADER
      this.stlLoader.load(
        'assets/rota.stl',
        (geometry) => {
          try {
            // STL FUNCTION TO SET GEOMETRY
            resolve(this.onSTLLoad(obj, geometry));
          } catch (error) {
            console.error('Error during STL load processing:', error);
            reject(error);
          }
        },
        ($event) => {
          // PROGRESS VALUES
          console.log($event);
        },
        (error: unknown) => {
          // ON ERROR
          console.error('Error while generating:', error);
          reject(error);
        }
      );
    });
  }

  onSTLLoad(obj: any = {}, geometry: THREE.BufferGeometry) {
    try {
      // NORMALIZE GEOMETRY
      geometry.center();
      geometry.computeBoundingSphere();
      // geometry.computeFaceNormals();
      geometry.computeVertexNormals();
      // CREATE AND LOAD OBJ
      let newObj = new THREE.Mesh(geometry, this.material);
      this.onObjectLoad(obj, newObj);
    } catch (error) {
      console.error('Error during geometry processing:', error);
      throw error;
    }
  }

  // PUSH OBJECT TO BUILD PLATE
  onObjectLoad(obj: any, newObj: any) {
    let parse;
    if (obj.data) {
      // CHECK FOR PRINT JOB DATA
      parse = JSON.parse(obj.data);
    } else if (
      obj.bp_data &&
      this.rotationalTestingService.isJsonString(obj.bp_data)
    ) {
      // CHECK FOR COOKIES
      parse = JSON.parse(obj.bp_data);
    }
    // MOVE POSITION/ SCALE/ ROTATION IF SET
    if (parse && parse.position) {
      newObj.position.set(parse.position.x, parse.position.y, parse.position.z);
      newObj.scale.set(parse.scale.x, parse.scale.y, parse.scale.z);
      newObj.rotation.set(parse.rotation.x, parse.rotation.y, parse.rotation.z);
      if (PRINTER_CONFIG) {
        newObj.slider = this.rotationalTestingService.getSlider(
          parse,
          PRINTER_CONFIG?.offsets,
          newObj
        );
      } else {
        newObj.slider = this.rotationalTestingService.getSlider(
          parse,
          null,
          newObj
        );
      }
      newObj.offCenter = true;
    } else {
      // DEFAULT POSITION
      let box = new THREE.Box3().setFromObject(newObj, true);
      newObj.position.set(0, 0, -box.min.z);
      if (PRINTER_CONFIG) {
        newObj.slider = this.rotationalTestingService.getSlider(
          null,
          PRINTER_CONFIG?.offsets,
          newObj
        );
      } else {
        newObj.slider = this.rotationalTestingService.getSlider(
          null,
          null,
          newObj
        );
      }
    }
    this.selectedObject = newObj;
    //ADD IT TO THE SCENE
    this.scene.add(newObj);
  }

  addEventListeners() {
    window.addEventListener('keydown', (event) => this.onKeyDown(event), false);

    if (this.container)
      this.container.addEventListener(
        'mousedown',
        (event) => this.onMouseDown(event),
        false
      );
  }

  // TRANSFORM CONTROLS CHANGE
  onTransformControlChange(arg: any) {
    console.log(this.selectedObject);
    // ENABLE ORBITAL CONTROL
    const { mode } = arg;
    this.orbitControl.enabled = true;
    //HANDLE X, Y, Z ROTATIONS MOVEMENTS VALUES
    if (mode === 'translate') {
      this.selectedObject.slider.translate.x.value =
        this.selectedObject?.position?.x;
      this.selectedObject.slider.translate.y.value =
        this.selectedObject?.position?.y;
      this.selectedObject.slider.translate.z.value =
        this.selectedObject?.position?.z;
    }
    //HANDLE SCALE MOVEMENTS VALUES
    else if (mode === 'scale') {
      // AUTO CORRECT NEGATIVE VALUES
      if (this.selectedObject?.scale?.x <= 0)
        this.selectedObject.scale.x = 0.01;
      if (this.selectedObject?.scale?.y <= 0)
        this.selectedObject.scale.y = 0.01;
      if (this.selectedObject?.scale?.z <= 0)
        this.selectedObject.scale.z = 0.01;

      let sliderValueX = this.selectedObject?.scale?.x * 100;
      let sliderValueY = this.selectedObject?.scale?.y * 100;
      let sliderValueZ = this.selectedObject?.scale?.z * 100;

      if (this.selectedObject?.slider?.scale?.x?.value !== sliderValueX) {
        if (this.selectedObject?.slider?.scale?.isLocked) {
          this.syncScaleAxes({
            x: sliderValueX,
            y: this.selectedObject?.scale?.x,
          });
        } else this.selectedObject.slider.scale.x.value = sliderValueX;
      }
      if (this.selectedObject?.slider?.scale?.y?.value !== sliderValueY) {
        if (this.selectedObject?.slider?.scale?.isLocked) {
          this.syncScaleAxes({
            x: sliderValueY,
            y: this.selectedObject?.scale?.y,
          });
        } else this.selectedObject.slider.scale.y.value = sliderValueY;
      }
      if (this.selectedObject?.slider?.scale?.z?.value !== sliderValueZ) {
        if (this.selectedObject?.slider?.scale?.isLocked) {
          this.syncScaleAxes({
            x: sliderValueZ,
            y: this.selectedObject?.scale?.z,
          });
        } else this.selectedObject.slider.scale.z.value = sliderValueZ;
      }

      if (this.selectedObject?.slider?.scale?.zAdjusted) {
        this.rotationalTestingService.moveObjectOnPlate(this.selectedObject);
      }
      // UPDATE OBJECT DIMENSION
      this.selectedObject = this.rotationalTestingService.updateObjectDimension(
        this.selectedObject
      );
    }
    //HANDLE CIRCULAR MOVEMENTS VAUES
    else if (mode === 'rotate') {
      this.selectedObject.slider.rotate.x.value =
        Math.abs(this.selectedObject.rotation.x) * (180 / Math.PI);
      this.selectedObject.slider.rotate.y.value =
        Math.abs(this.selectedObject.rotation.y) * (180 / Math.PI);
      this.selectedObject.slider.rotate.z.value =
        Math.abs(this.selectedObject.rotation.z) * (180 / Math.PI);

      // Force matrix update
      this.selectedObject.updateMatrixWorld(true);

      // Move object to plate after rotation
      const box = new THREE.Box3().setFromObject(this.selectedObject);
      this.selectedObject.position.z -= box.min.z;
      this.selectedObject.updateMatrixWorld(true);

      if (this.selectedObject?.slider?.rotate?.zAdjusted) {
        this.rotationalTestingService.moveObjectOnPlate(this.selectedObject);
      }

      this.selectedObject = this.rotationalTestingService.updateObjectDimension(
        this.selectedObject
      );
    }

    // Update bounding box with improved handling
    this.updateBoundingBox(this.selectedObject);
  }

  private normalizeAngle(angle: number): number {
    // Normalize angle to 0-360 range
    angle = angle % 360;
    return angle < 0 ? angle + 360 : angle;
  }

  // updateBoundingBox(stl: any) {
  //   if (stl) {
  //     this.scene.remove(this.bboxOfSelectedObject);
  //     this.bboxOfSelectedObject = new THREE.BoxHelper(stl, 0x2196f3);
  //     this.bboxOfSelectedObject.update();

  //     // CHECK IF OBJECT IS OUT OF BUILD PLATE
  //     this.bboxOfSelectedObject.geometry.computeBoundingBox();
  //     this.restricted = this.rotationalTestingService.evaluatePlateBoundary(
  //       PRINTER_CONFIG,
  //       this.bboxOfSelectedObject.geometry.boundingBox,
  //       {}
  //     );
  //     stl.restricted = this.restricted;
  //     if (this.restricted) {
  //       this.bboxOfSelectedObject = new THREE.BoxHelper(stl, 0xff5333);
  //       this.bboxOfSelectedObject.update();
  //     }

  //     this.scene.add(this.bboxOfSelectedObject);
  //   }
  // }

  updateBoundingBox(stl: any) {
    if (stl) {
        this.scene.remove(this.bboxOfSelectedObject);
        
        // Compute world-space bounding box
        const geometry = stl.geometry;
        const worldMatrix = stl.matrixWorld;
        
        // Create a temporary geometry to apply transformations
        const vertices:any = Array.from(geometry.attributes.position.array);
        const worldVertices = [];
        
        // Transform all vertices to world space
        for (let i = 0; i < vertices.length; i += 3) {
            const vertex = new THREE.Vector3(vertices[i], vertices[i + 1], vertices[i + 2]);
            vertex.applyMatrix4(worldMatrix);
            worldVertices.push(vertex);
        }
        
        // Create a new geometry from transformed vertices
        const tempGeometry = new THREE.BufferGeometry();
        const positions = new Float32Array(worldVertices.length * 3);
        worldVertices.forEach((vertex, i) => {
            positions[i * 3] = vertex.x;
            positions[i * 3 + 1] = vertex.y;
            positions[i * 3 + 2] = vertex.z;
        });
        tempGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        
        // Create box helper using the transformed geometry
        const tempMesh = new THREE.Mesh(tempGeometry);
        this.bboxOfSelectedObject = new THREE.BoxHelper(tempMesh, 0x2196f3);
        
        // Check if object is out of build plate
        tempGeometry.computeBoundingBox();
        const boundingBox = tempGeometry.boundingBox;
        if (boundingBox) {
            this.restricted = this.rotationalTestingService.evaluatePlateBoundary(
                PRINTER_CONFIG,
                boundingBox,
                {}
            );
        }
        
        stl.restricted = this.restricted;
        if (this.restricted) {
            this.bboxOfSelectedObject = new THREE.BoxHelper(tempMesh, 0xff5333);
        }

        this.scene.add(this.bboxOfSelectedObject);
        
        // Clean up
        tempGeometry.dispose();
    }
}


  removeBoundingBox() {
    if (this.bboxOfSelectedObject) {
      this.scene.remove(this.bboxOfSelectedObject);
      this.bboxOfSelectedObject = null;
    }
  }

  syncScaleAxes(value: any) {
    let sliderValue = value?.x,
      rotateValue = value.y;
    // SET ROTATE VALUES
    this.selectedObject.scale.x = rotateValue;
    this.selectedObject.scale.y = rotateValue;
    this.selectedObject.scale.z = rotateValue;

    // SET SLIDER VALUES
    this.selectedObject.slider.scale.x.value = sliderValue;
    this.selectedObject.slider.scale.y.value = sliderValue;
    this.selectedObject.slider.scale.z.value = sliderValue;
  }

  onMouseDown(event: MouseEvent) {
    event.preventDefault();
    this.raycaster.setFromCamera(
      this.rotationalTestingService.get2DVectorFromEvent(event, this.container),
      this.camera
    );
    this.transformCtrlAttach(this.selectedObject);
  }

  transformCtrlAttach(obj: any) {
    if (!obj) {
      this.transformControl.detach();
    }
    this.selectedObject = obj;

    // UPDATE OBJECT DIMENSION
    obj = this.rotationalTestingService.updateObjectDimension(
      this.selectedObject
    );

    this.rotationalTestingService.selected.selectedObject = obj;

    if (obj) {
      this.transformControl.attach(this.selectedObject);
    }
    this.removeBoundingBox();
    this.updateBoundingBox(this.selectedObject);
  }

  onKeyDown(event: KeyboardEvent) {
    switch (event.key) {
      case 'w': // W
      case 'W':
        this.transformControl.setMode('translate');
        break;
      case 'e': // E
      case 'E':
        this.transformControl.setMode('scale');
        break;
      case 'r': // R
      case 'R':
        this.transformControl.setMode('rotate');
        break;
      default:
        return;
    }
  }

  onSliderInputChange(arg:any) {
    if (arg.mode === 'translate') {
      // correct invalid values
      if (typeof this.selectedObject.slider.translate.x.value !== 'number') this.selectedObject.slider.translate.x.value = 0;
      if (typeof this.selectedObject.slider.translate.y.value !== 'number') this.selectedObject.slider.translate.y.value = 0;
      if (typeof this.selectedObject.slider.translate.z.value !== 'number') this.selectedObject.slider.translate.z.value = 0;

      if (arg.x) this.selectedObject.position.x = this.selectedObject.slider.translate.x.value;
      else if (arg.y) this.selectedObject.position.y = this.selectedObject.slider.translate.y.value;
      else if (arg.z) this.selectedObject.position.z = this.selectedObject.slider.translate.z.value;
    }
    else if (arg.mode === 'scale') {
      // correct invalid values
      if (typeof this.selectedObject.slider.scale.x.value !== 'number') return;
      else if (this.selectedObject.slider.scale.x.value <= 0) this.selectedObject.slider.scale.x.value = 0.1;
      if (typeof this.selectedObject.slider.scale.y.value !== 'number') return;
      else if (this.selectedObject.slider.scale.y.value <= 0) this.selectedObject.slider.scale.y.value = 0.1;
      if (typeof this.selectedObject.slider.scale.z.value !== 'number') return;
      else if (this.selectedObject.slider.scale.z.value <= 0) this.selectedObject.slider.scale.z.value = 0.1;

      if (this.selectedObject.slider.scale.isLocked) {
        if (arg.x) {
          this.syncScaleAxes({x:this.selectedObject.slider.scale.x.value, y:this.selectedObject.slider.scale.x.value / 100});
        }
        else if (arg.y) {
          this.syncScaleAxes({x:this.selectedObject.slider.scale.y.value, y:this.selectedObject.slider.scale.y.value / 100});
        }
        else if (arg.z) {
          this.syncScaleAxes({x:this.selectedObject.slider.scale.z.value, y:this.selectedObject.slider.scale.z.value / 100});
        }
      }
      else {
        if (arg.x) this.selectedObject.scale.x = this.selectedObject.slider.scale.x.value / 100;
        else if (arg.y) this.selectedObject.scale.y = this.selectedObject.slider.scale.y.value / 100;
        else if (arg.z) this.selectedObject.scale.z = this.selectedObject.slider.scale.z.value / 100;
      }
      if (this.selectedObject.slider.scale.zAdjusted) this.rotationalTestingService.moveObjectOnPlate(this.selectedObject);

      // update object dimension
      this.rotationalTestingService.updateObjectDimension(this.selectedObject);
    }
    else if (arg.mode === 'rotate') {
      // correct invalid values
      if (typeof this.selectedObject.slider.rotate.x.value !== 'number') this.selectedObject.slider.rotate.x.value = 0;
      if (typeof this.selectedObject.slider.rotate.y.value !== 'number') this.selectedObject.slider.rotate.y.value = 0;
      if (typeof this.selectedObject.slider.rotate.z.value !== 'number') this.selectedObject.slider.rotate.z.value = 0;

      if (arg.x) this.selectedObject.rotation.x = this.selectedObject.slider.rotate.x.value / (180 / Math.PI);
      else if (arg.y) this.selectedObject.rotation.y = this.selectedObject.slider.rotate.y.value / (180 / Math.PI);
      else if (arg.z) this.selectedObject.rotation.z = this.selectedObject.slider.rotate.z.value / (180 / Math.PI);

      // Force matrix update
      this.selectedObject.updateMatrixWorld(true);

      // Move object to plate after rotation
      const box = new THREE.Box3().setFromObject(this.selectedObject);
      this.selectedObject.position.z -= box.min.z;
      this.selectedObject.updateMatrixWorld(true);

      if (this.selectedObject.slider.rotate.zAdjusted) {
        this.rotationalTestingService.moveObjectOnPlate(this.selectedObject);
      }

      // update object dimension
      this.rotationalTestingService.updateObjectDimension(this.selectedObject);
    }

    // update bounding box
    this.updateBoundingBox(this.selectedObject);
  }
}
