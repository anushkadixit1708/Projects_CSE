# Improving-the- Content Based Image Retrieval (CBIR) -Process
An efficient framework for image retrieval using color, texture and edge features. Implementation of a research paper.

Shows similar images based on input image.

Improved CBIR process is implemented in <b>Matlab</b>.

## Dataset
 
COREL 10k image database download page - http://www.ci.gxnu.edu.cn/cbir/Dataset.aspx Copy the first 5000 images and paste it to a new folder, it will become your COREL 5k dataset.

WANG (1k) image dataset download - http://wang.ist.psu.edu/~jwang/test1.tar

name the dataset folder as corel10k , corel5k , wang.

## Running the project: 
   1. **`Run projectmain.m`**
   2. Wait for 1-2 minute and you will get the related images to your search images.

## Output:

<image src="https://github.com/anujkumar070/Projects_CSE/blob/master/Image%20Retrieval%20System%20Using%20Texture%2CColor%20and%20Edge/Images/output1.JPG" alt="output1">
 <hr></hr>
<image src="https://github.com/anujkumar070/Projects_CSE/blob/master/Image%20Retrieval%20System%20Using%20Texture%2CColor%20and%20Edge/Images/output2.JPG" alt="output2">
 
# Explanation of Code Files:

1. projectmain.m - It is the main file, it calls all the functions. This file calculates the mean of all images and segregates them accordingly on basis of mean and sd value of query image. Selected images and their corresponding gray images are stored in new folders named as 'selected' and 'selectedGray'

2. start.m - It reads the query image and saves the gray and edge version of same image, to be used by other function for processing.

3. edgefeature.m - This function calculates histogram(r,g,b channels) of all the edge images and commpares them with histogram of query image. Chi-square similarity is used. After comparison Results are stored in a array

4. similarity.m - This function normalizes the two arrays obtained from edgefeature and lbpfeature function and adds them. Result is stored in new array. Now the array is sorted and images corresponding to first 10-20 values are shown.
resize.m - It resize all the images to 256x256 size and saves them to a new folder called 'samesize'

5. lbpfeature.m - It calculates the lbp features for all the images and compare them with the feature of query images.3x3 mask is used for lbp feature After calculation result are stored in a array

6. cannyedge.m - It reads all the images, process them (convert rgb to hsv, running canny edge on V channel and converting back to rgb) and save the edge image in a new folder named as 'selectedEdge'

7. natsort.m - used to sort file name of images


