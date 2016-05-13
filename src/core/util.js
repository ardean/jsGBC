import settings from "../settings";

export default {
  toTypedArray: function (baseArray, memtype) {
    try {
      if (settings[5]) {
        return baseArray;
      }
      if (!baseArray || !baseArray.length) {
        return [];
      }
      var length = baseArray.length;

      let typedArrayTemp;
      switch (memtype) {
      case "uint8":
        typedArrayTemp = new Uint8Array(length);
        break;
      case "int8":
        typedArrayTemp = new Int8Array(length);
        break;
      case "int32":
        typedArrayTemp = new Int32Array(length);
        break;
      case "float32":
        typedArrayTemp = new Float32Array(length);
      }

      for (var index = 0; index < length; index++) {
        typedArrayTemp[index] = baseArray[index];
      }

      return typedArrayTemp;
    } catch (error) {
      console.log("Could not convert an array to a typed array: " + error.message, 1);
      return baseArray;
    }
  },
  fromTypedArray: function (baseArray) {
    try {
      if (!baseArray || !baseArray.length) {
        return [];
      }
      var arrayTemp = [];
      for (var index = 0; index < baseArray.length; ++index) {
        arrayTemp[index] = baseArray[index];
      }
      return arrayTemp;
    } catch (error) {
      console.log("Conversion from a typed array failed: " + error.message, 1);
      return baseArray;
    }
  },
  getTypedArray: function (length, defaultValue, numberType) {
    let arrayHandle;
    try {
      if (settings[5]) {
        throw (new Error("Settings forced typed arrays to be disabled."));
      }
      switch (numberType) {
      case "int8":
        arrayHandle = new Int8Array(length);
        break;
      case "uint8":
        arrayHandle = new Uint8Array(length);
        break;
      case "int32":
        arrayHandle = new Int32Array(length);
        break;
      case "float32":
        arrayHandle = new Float32Array(length);
      }
      if (defaultValue !== 0) {
        let index = 0;
        while (index < length) {
          arrayHandle[index++] = defaultValue;
        }
      }
    } catch (error) {
      console.log("Could not convert an array to a typed array: " + error.message, 1);
      arrayHandle = [];
      let index = 0;
      while (index < length) {
        arrayHandle[index++] = defaultValue;
      }
    }
    return arrayHandle;
  }
};
