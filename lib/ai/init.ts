import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-react-native';

export async function initTensorFlow() {
  try {
    await tf.ready();
    console.log("TensorFlow.js is ready!");
    return true;
  } catch (error) {
    console.error("Failed to initialize TensorFlow:", error);
    return false;
  }
}
