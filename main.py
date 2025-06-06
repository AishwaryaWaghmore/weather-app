import cv2
import tkinter as tk
from tkinter import filedialog
import os
import easygui

def pencil_sketch(image_path, output_path):
    # Read the input image
    image = cv2.imread(image_path)
    if image is None:
        print("Error: Unable to load image. Please check the path.")
        return
    
    # Convert the image to grayscale
    gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    
    # Invert the grayscale image
    inverted_gray_image = 255 - gray_image
    
    # Apply Gaussian blur to the inverted grayscale image
    blurred_image = cv2.GaussianBlur(inverted_gray_image, (21, 21), sigmaX=0, sigmaY=0)
    
    # Invert the blurred image
    inverted_blurred_image = 255 - blurred_image
    
    # Create the pencil sketch by dividing the grayscale image by the inverted blurred image
    pencil_sketch_image = cv2.divide(gray_image, inverted_blurred_image, scale=256.0)
    
    # Save the pencil sketch image
    cv2.imwrite(output_path, pencil_sketch_image)
    print(f"Pencil sketch saved at: {output_path}")

    # Display the original image and the pencil sketch
    cv2.imshow("Original Image", image)
    cv2.imshow("Pencil Sketch", pencil_sketch_image)
    cv2.waitKey(0)
    cv2.destroyAllWindows()

def select_image_and_convert():
    # Open a file dialog to allow the user to select an image
    file_path = easygui.fileopenbox(
        title="Select an Image",
        filetypes=["*.jpg", "*.jpeg", "*.png", "*.bmp"]
    )
    
    if not file_path:
        print("No file selected. Exiting.")
        return
    
    # Define the output path for the pencil sketch
    output_path = os.path.splitext(file_path)[0] + "_pencil_sketch.jpg"
    
    # Convert the selected image to a pencil sketch
    pencil_sketch(file_path, output_path)

# Run the program
if __name__ == "__main__":
    select_image_and_convert()