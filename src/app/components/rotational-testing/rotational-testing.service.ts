import { Injectable } from '@angular/core';
import * as THREE from 'three';

@Injectable({
  providedIn: 'root',
})
export class RotationalTestingService {
  selected: any = {
    selectableObjects: [],
    selectedObject: {},
    printJob: null,
    requests: [],
  };
  constructor() {}

  drawCircle(size: number, color: any) {
    let material = new THREE.LineBasicMaterial(color);
    let geometry = new THREE.CircleGeometry(size, 64, 0, 2.1 * Math.PI);
    // geometry?.vertices?.shift();
    return new THREE.Line(geometry, material);
  }

  drawRectGrid(
    size_x: number,
    size_z: number,
    divisions: number,
    color1: any,
    color2: any,
    color3: any
  ) {
    divisions = divisions || 1;
    color1 = new THREE.Color(color1 !== undefined ? color1 : 0x444444);
    color2 = new THREE.Color(color2 !== undefined ? color2 : 0x888888);

    let end_x, end_z;
    end_x = divisions * Math.trunc(size_x / divisions);
    end_z = divisions * Math.trunc(size_z / divisions);

    let vertices = [],
      colors: any = [];

    let j = 0;
    var edge_color = true;
    if (end_x !== size_x) {
      edge_color = false;
      vertices.push(-size_x, 0, -size_z, -size_x, 0, size_z);
      vertices.push(size_x, 0, -size_z, size_x, 0, size_z);
      color1.toArray(colors, j);
      j += 3;
      color1.toArray(colors, j);
      j += 3;
      color1.toArray(colors, j);
      j += 3;
      color1.toArray(colors, j);
      j += 3;
    }

    for (let kx = -end_x; kx <= end_x; kx += divisions) {
      vertices.push(kx, 0, -size_z, kx, 0, size_z);
      var colort =
        (edge_color && Math.abs(kx) === end_x) || 0 === kx % (5 * divisions)
          ? color1
          : color2;
      colort.toArray(colors, j);
      j += 3;
      colort.toArray(colors, j);
      j += 3;
    }

    if (end_z !== size_z) {
      edge_color = false;
      vertices.push(-size_x, 0, -size_z, size_x, 0, -size_z);
      vertices.push(-size_x, 0, size_z, size_x, 0, size_z);
      color1.toArray(colors, j);
      j += 3;
      color1.toArray(colors, j);
      j += 3;
      color1.toArray(colors, j);
      j += 3;
      color1.toArray(colors, j);
      j += 3;
    } else {
      edge_color = true;
    }

    for (let kz = -end_z; kz <= end_z; kz += divisions) {
      vertices.push(-size_x, 0, kz, size_x, 0, kz);
      let color =
        (edge_color && Math.abs(kz) === end_z) || 0 === kz % (5 * divisions)
          ? color1
          : color2;
      color.toArray(colors, j);
      j += 3;
      color.toArray(colors, j);
      j += 3;
    }

    if (color3) {
      color3 = new THREE.Color(color3);
      vertices.push(-divisions, 0, -divisions, divisions, 0, -divisions);
      color3.toArray(colors, j);
      j += 3;
      color3.toArray(colors, j);
      j += 3;

      vertices.push(divisions, 0, -divisions, divisions, 0, divisions);
      color3.toArray(colors, j);
      j += 3;
      color3.toArray(colors, j);
      j += 3;

      vertices.push(divisions, 0, divisions, -divisions, 0, divisions);
      color3.toArray(colors, j);
      j += 3;
      color3.toArray(colors, j);
      j += 3;

      vertices.push(-divisions, 0, divisions, -divisions, 0, -divisions);
      color3.toArray(colors, j);
      j += 3;
      color3.toArray(colors, j);
    }

    let geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(vertices, 3)
    );
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    let material = new THREE.LineBasicMaterial({ color: 0xb1e1ff });

    return new THREE.LineSegments(geometry, material);
  }

  drawCircularGrid(size: number, step: number, color: any) {
    const points = [];
    var material = new THREE.LineBasicMaterial(color);

    for (var i = -size; i <= size; i += step) {
      let c = this.pythagorean_ca(size, i);

      // drawing X
      points.push(new THREE.Vector3(-c, i, -0.04));
      points.push(new THREE.Vector3(c as number, i, -0.04));

      // drawing Y
      points.push(new THREE.Vector3(i, -c, -0.04));
      points.push(new THREE.Vector3(i, c as number, -0.04));
    }
    var geometry = new THREE.BufferGeometry().setFromPoints(points);

    return new THREE.LineSegments(geometry, material);
  }

  pythagorean_ca(c: number, a: number) {
    if (typeof c !== 'number' || typeof a !== 'number') {
      return false;
    }
    return Math.sqrt(Math.pow(c, 2) - Math.pow(a, 2));
  }

  isJsonString(str: any) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }

  getSlider(values: any, limits: any, object: any) {
    let defaultLimits = {
      translate: { floor: -100, ceil: 100 },
      scale: { floor: 1, ceil: 500 },
      rotate: {
        floor: 0.0,
        ceil: 360.0,
        tickStep: 45,
        tickValueStep: 45,
        showTicks: true,
      },
    };

    if (limits) {
      // translate limits
      let limit = 100;
      if (limits.radius_mm) {
        limit = limits.radius_mm;
      } else if (limits.length_mm && limits.width_mm) {
        limit =
          limits.length_mm >= limits.width_mm
            ? limits.length_mm
            : limits.width_mm;
      }

      defaultLimits.translate.floor = -limit;
      defaultLimits.translate.ceil = limit;

      // scale limits
      let bbox = new THREE.Box3().setFromObject(object);
      const zSize = bbox.max.z - bbox.min.z;
      defaultLimits.scale.ceil =
        +(limits.max_height_mm / zSize).toFixed(2) * 100;
    }

    var defaultValues = {
      translate: {
        x: {
          value: 0,
          floor: defaultLimits.translate.floor,
          ceil: defaultLimits.translate.ceil,
        },
        y: {
          value: 0,
          floor: defaultLimits.translate.floor,
          ceil: defaultLimits.translate.ceil,
        },
        z: {
          value: 0,
          floor: defaultLimits.translate.floor,
          ceil: defaultLimits.translate.ceil,
        },
      },
      scale: {
        x: {
          value: 100,
          floor: defaultLimits.scale.floor,
          ceil: defaultLimits.scale.ceil,
        },
        y: {
          value: 100,
          floor: defaultLimits.scale.floor,
          ceil: defaultLimits.scale.ceil,
        },
        z: {
          value: 100,
          floor: defaultLimits.scale.floor,
          ceil: defaultLimits.scale.ceil,
        },
      },
      rotate: {
        x: {
          value: 0.0,
          floor: defaultLimits.rotate.floor,
          ceil: defaultLimits.rotate.ceil,
          showTicks: defaultLimits.rotate.showTicks,
          tickStep: defaultLimits.rotate.tickStep,
          tickValueStep: defaultLimits.rotate.tickValueStep,
        },
        y: {
          value: 0.0,
          floor: defaultLimits.rotate.floor,
          ceil: defaultLimits.rotate.ceil,
          showTicks: defaultLimits.rotate.showTicks,
          tickStep: defaultLimits.rotate.tickStep,
          tickValueStep: defaultLimits.rotate.tickValueStep,
        },
        z: {
          value: 0.0,
          floor: defaultLimits.rotate.floor,
          ceil: defaultLimits.rotate.ceil,
          showTicks: defaultLimits.rotate.showTicks,
          tickStep: defaultLimits.rotate.tickStep,
          tickValueStep: defaultLimits.rotate.tickValueStep,
        },
      },
    };

    if (values) {
      defaultValues.translate.x.value = values.position.x;
      defaultValues.translate.y.value = values.position.y;
      defaultValues.translate.z.value = values.position.z;
      defaultValues.scale.x.value = values.scale.x * 100;
      defaultValues.scale.y.value = values.scale.y * 100;
      defaultValues.scale.z.value = values.scale.z * 100;
      defaultValues.rotate.x.value = values.rotation.x;
      defaultValues.rotate.y.value = values.rotation.y;
      defaultValues.rotate.z.value = values.rotation.z;
    }

    var slider = {
      translate: {
        x: {
          value: defaultValues.translate.x.value,
          options: {
            floor: defaultValues.translate.x.floor,
            ceil: defaultValues.translate.x.ceil,
            onChange: (sliderId: any, modelValue: number) => {
              let position: any = {};
              position.x = modelValue;
              this.move(position, this.selected.selectedObject);
            },
            // onStart: this.onStartSliding.bind(this),
            // onEnd: this.onEnd_translate.bind(this),
          },
        },
        y: {
          value: defaultValues.translate.y.value,
          options: {
            floor: defaultValues.translate.y.floor,
            ceil: defaultValues.translate.y.ceil,
            onChange: (sliderId: any, modelValue: number) => {
              let position: any = {};
              position.y = modelValue;
              this.move(position, this.selected.selectedObject);
            },
            // onStart: this.onStartSliding.bind(this),
            // onEnd: this.onEnd_translate.bind(this),
          },
        },
        z: {
          value: defaultValues.translate.z.value,
          options: {
            floor: defaultValues.translate.z.floor,
            ceil: defaultValues.translate.z.ceil,
            onChange: (sliderId: any, modelValue: number) => {
              let position: any = {};
              position.z = modelValue;
              this.move(position, this.selected.selectedObject);
            },
            // onStart: this.onStartSliding.bind(this),
            // onEnd: this.onEnd_translate.bind(this),
          },
        },
      },
      scale: {
        x: {
          value: defaultValues.scale.x.value,
          options: {
            floor: defaultValues.scale.x.floor,
            ceil:
              defaultValues.scale.x.ceil < defaultValues.scale.x.value
                ? defaultValues.scale.x.value
                : defaultValues.scale.x.ceil.toFixed(2),
            onChange: (sliderId: any, modelValue: number) => {
              let scale: any = {};
              scale.x = modelValue / 100;

              let that = this.selected.selectedObject.slider.scale;
              if (that.isLocked) {
                scale.y = modelValue / 100;
                that.y.value = modelValue;
                scale.z = modelValue / 100;
                that.z.value = modelValue;
              }
              // adjust position z
              if (that.zAdjusted) {
                this.moveObjectOnPlate(this.selected.selectedObject);
              }
              this.scale(scale, this.selected.selectedObject);
            },
            // onStart: this.onStartSliding.bind(this),
            // onEnd: this.onEnd_scale.bind(this),
          },
        },
        y: {
          value: defaultValues.scale.y.value,
          options: {
            floor: defaultValues.scale.y.floor,
            ceil:
              defaultValues.scale.y.ceil < defaultValues.scale.y.value
                ? defaultValues.scale.y.value
                : defaultValues.scale.y.ceil.toFixed(2),
            onChange: (sliderId: any, modelValue: number) => {
              let scale: any = {};
              scale.y = modelValue / 100;

              let that = this.selected.selectedObject.slider.scale;
              if (that.isLocked) {
                scale.x = modelValue / 100;
                that.x.value = modelValue;
                scale.z = modelValue / 100;
                that.z.value = modelValue;
              }
              // adjust position z
              if (that.zAdjusted) {
                this.moveObjectOnPlate(this.selected.selectedObject);
              }
              this.scale(scale, this.selected.selectedObject);
            },
            // onStart: this.onStartSliding.bind(this),
            // onEnd: this.onEnd_scale.bind(this),
          },
        },
        z: {
          value: defaultValues.scale.z.value,
          options: {
            floor: defaultValues.scale.z.floor,
            ceil:
              defaultValues.scale.z.ceil < defaultValues.scale.z.value
                ? defaultValues.scale.z.value
                : defaultValues.scale.z.ceil.toFixed(2),
            onChange: (sliderId: any, modelValue: number) => {
              let scale: any = {};
              scale.z = modelValue / 100;

              let that = this.selected.selectedObject.slider.scale;
              if (that.isLocked) {
                scale.x = modelValue / 100;
                that.x.value = modelValue;
                scale.y = modelValue / 100;
                that.y.value = modelValue;
              }
              // adjust position z
              if (that.zAdjusted) {
                this.moveObjectOnPlate(this.selected.selectedObject);
              }
              this.scale(scale, this.selected.selectedObject);
            },
            // onStart: this.onStartSliding.bind(this),
            // onEnd: this.onEnd_scale.bind(this),
          },
        },
        isLocked: true,
        zAdjusted: true,
      },
      rotate: {
        x: {
          value: defaultValues.rotate.x.value,
          options: {
            floor: defaultValues.rotate.x.floor,
            ceil: defaultValues.rotate.x.ceil,
            step: 0.1,
            showTicks: defaultValues.rotate.x.showTicks,
            tickStep: defaultValues.rotate.x.tickStep,
            tickValueStep: defaultLimits.rotate.tickValueStep,

            onChange: (sliderId: any, modelValue: number) => {
              let rotation: any = {};
              rotation.x = modelValue;
              this.rotate(rotation, this.selected.selectedObject);
            },
            // onStart: this.onStartSliding.bind(this),
            // onEnd: this.onEnd_rotate.bind(this),
          },
        },
        y: {
          value: defaultValues.rotate.y.value,
          options: {
            floor: defaultValues.rotate.y.floor,
            ceil: defaultValues.rotate.y.ceil,
            step: 0.1,
            showTicks: defaultValues.rotate.x.showTicks,
            tickStep: defaultValues.rotate.y.tickStep,
            tickValueStep: defaultLimits.rotate.tickValueStep,
            onChange: (sliderId: any, modelValue: number) => {
              let rotation: any = {};
              rotation.y = modelValue;
              this.rotate(rotation, this.selected.selectedObject);
            },
            // onStart: this.onStartSliding.bind(this),
            // onEnd: this.onEnd_rotate.bind(this),
          },
        },
        z: {
          value: defaultValues.rotate.z.value,
          options: {
            floor: defaultValues.rotate.z.floor,
            ceil: defaultValues.rotate.z.ceil,
            step: 0.1,
            showTicks: defaultValues.rotate.x.showTicks,
            tickStep: defaultValues.rotate.z.tickStep,
            tickValueStep: defaultLimits.rotate.tickValueStep,
            onChange: (sliderId: any, modelValue: number) => {
              let rotation: any = {};
              rotation.z = modelValue;
              this.rotate(rotation, this.selected.selectedObject);
            },
            // onStart: this.onStartSliding.bind(this),
            // onEnd: this.onEnd_rotate.bind(this),
          },
        },
        zAdjusted: true,
      },
    };
    return slider;
  }

  move(position: { x?: number; y?: number; z?: number }, obj: any) {
    if (typeof position.x != 'undefined') obj.position.x = position.x;
    if (typeof position.y != 'undefined') obj.position.y = position.y;
    if (typeof position.z != 'undefined') obj.position.z = position.z;
  }

  rotate(
    rotation: { x?: number; y?: number; z?: number },
    obj: any,
    value?: boolean
  ) {
    if (typeof rotation.x != 'undefined')
      obj.rotation.x = value ? rotation.x : rotation.x * (Math.PI / 180);
    if (typeof rotation.y != 'undefined')
      obj.rotation.y = value ? rotation.y : rotation.y * (Math.PI / 180);
    if (typeof rotation.z != 'undefined')
      obj.rotation.z = value ? rotation.z : rotation.z * (Math.PI / 180);
  }

  scale(scale: { x?: number; y?: number; z?: number }, obj: any) {
    if (typeof scale.x != 'undefined') obj.scale.x = scale.x;
    if (typeof scale.y != 'undefined') obj.scale.y = scale.y;
    if (typeof scale.z != 'undefined') obj.scale.z = scale.z;
  }

  moveObjectOnPlate(obj: any) {
    let box = new THREE.Box3().setFromObject(obj);
    obj.position.z += -box.min.z;

    // obj.slider.translate.z.value = obj?.position?.z.toFixed(0);
  }
  updateObjectDimension(obj: any) {
    if (!obj) return false;

    // Calculate the bounding box
    const box = new THREE.Box3().setFromObject(obj);

    // Get the size as a Vector3
    const size = new THREE.Vector3();
    box.getSize(size);

    // Store the dimensions as a Vector3
    obj.dimension = size;
    return obj;
  }

  // updateObjectDimension(obj: any): boolean {
  //   if (!obj || !obj.geometry) return false;

  //   // Ensure geometry bounding box is up-to-date
  //   obj.geometry.computeBoundingBox();

  //   // Get the bounding box for the geometry and apply the object's transformation
  //   const box = obj.geometry.boundingBox.clone().applyMatrix4(obj.matrixWorld);

  //   // Calculate and store the dimensions in the object
  //   const boxSize = new THREE.Vector3();
  //   box.getSize(boxSize);
  //   obj.dimension = {
  //     x: boxSize.x,
  //     y: boxSize.y,
  //     z: boxSize.z,
  //   };

  //   return true;
  // } 

  evaluatePlateBoundary(config: any, bbox: THREE.Box3, options: any = {}) {
    if (!options.heightFactor) options.heightFactor = 1;
    if (!options.radiusFactor) options.radiusFactor = 1;
    if (!options.widthFactor) options.widthFactor = 1;
    if (!options.lengthFactor) options.lengthFactor = 1;

    if (config && config?.physical_components?.circular_plate) {
      let heightRestriction =
        config.offsets.max_height_mm * options.heightFactor - 2;
      let radius = config.offsets.radius_mm - 2;
      let boundarySquare = radius * radius * options.radiusFactor;
      let d1 = bbox.min.x * bbox.min.x + bbox.min.y * bbox.min.y;
      let d2 = bbox.max.x * bbox.max.x + bbox.min.y * bbox.min.y;
      let d3 = bbox.min.x * bbox.min.x + bbox.max.y * bbox.max.y;
      let d4 = bbox.max.x * bbox.max.x + bbox.max.y * bbox.max.y;

      if (
        d1 > boundarySquare ||
        d2 > boundarySquare ||
        d3 > boundarySquare ||
        d4 > boundarySquare ||
        bbox.min.z < -0.1 ||
        (bbox.min.z > 0.1 && options.checkAboveBuildPlate) ||
        bbox.max.z > heightRestriction
      )
        return true;
      else return false;
    } else if (config && config?.physical_components?.rectangular_plate) {
      let boundaryWidth =
        (config.offsets.width_mm * options.widthFactor) / 2 - 2;
      let boundaryLength =
        (config.offsets.length_mm * options.lengthFactor) / 2 - 2;
      let heightRestriction =
        config.offsets.max_height_mm * options.heightFactor - 2;

      if (
        bbox.max.x > boundaryWidth ||
        bbox.min.x < -boundaryWidth ||
        bbox.min.y < -boundaryLength ||
        bbox.max.y > boundaryLength ||
        bbox.min.z < -0.1 ||
        (bbox.min.z > 0.1 && options.checkAboveBuildPlate) ||
        bbox.max.z > heightRestriction
      )
        return true;
      else return false;
    }
    return false;
  }

  get2DVectorFromEvent(
    event: MouseEvent,
    container: HTMLElement | null
  ): THREE.Vector2 {
    if (!container) return new THREE.Vector2();

    let viewportOffset = container.getBoundingClientRect();

    let vecotr2D = new THREE.Vector2();

    vecotr2D.x =
      ((event.clientX - viewportOffset.left) / container.offsetWidth) * 2 - 1;

    vecotr2D.y =
      -((event.clientY - viewportOffset.top) / container.offsetHeight) * 2 + 1;

    return vecotr2D;
  }
}
