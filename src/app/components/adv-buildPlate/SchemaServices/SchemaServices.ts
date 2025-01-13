export const populate = {
  /**
   * Select function to modify the object based on a reference
   * @param obj - The object to modify
   * @param ref - The reference of the control to update
   * @param callback - Optional callback function, such as an AI function, to process values
   * @returns The updated object
   */
  select: (
    obj: object,
    ref: string,
    callback?: (value: any) => any
  ): object => {
    // Clone the object to avoid mutation of the original object
    const updatedObject = { ...obj };

    // Access the select array and modify the object based on the reference
    if (updatedObject.hasOwnProperty('component')) {
      const component: any = (updatedObject as any).component;

      if (component.hasOwnProperty('select')) {
        component.select.forEach((selectItem: any) => {
          if (selectItem.ref === ref) {
            // Perform object modification
            selectItem.selected = callback
              ? callback(selectItem.selected) // Call the callback if provided
              : 'updated_value'; // Default value to update if no callback is provided
          }
        });
      }
    }

    return updatedObject;
  },

  /**
   * Button function to handle click events and modify the object state
   * @param obj - The object to modify
   * @param ref - The reference of the button to update
   * @param callback - Optional callback function to handle the button click logic
   * @returns The updated object
   */
  button: (
    obj: object,
    ref: string,
    callback?: (value: any) => any
  ): object => {
    const updatedObject = { ...obj };

    // Access the button array and modify the object based on the reference
    if (updatedObject.hasOwnProperty('component')) {
      const component: any = (updatedObject as any).component;

      if (component.hasOwnProperty('button')) {
        component.button.forEach((buttonItem: any) => {
          if (buttonItem.ref === ref) {
            // Modify object state or perform callback action
            buttonItem.disabled = callback
              ? callback(buttonItem.disabled)
              : !buttonItem.disabled; // Toggle disabled state if no callback provided
          }
        });
      }
    }

    return updatedObject;
  },
};

/**
 * Usage of these functions
 
 * const updatedControls = populate.select(CONTROLS, 'select_printer', (value) => {
  // Example AI function callback
  return `AI processed: ${value}`;
});

const updatedButtonControls = populate.button(CONTROLS, 'print_button', (value) => {
  // Example callback to handle button click logic
  return false; // Disables the button

});* */
