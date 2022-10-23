Improving-the-CBIR-Process
An efficient framework for image retrieval using color, texture and edge features. Implementation of a research paper.

Shows similar images based on input image.

Improved CBIR process is implemented in Matlab.

Dataset
Corel-10k dataset contains 100 categories, and there are 10,000 images from diverse contents such as sunset, beach, flower, building, car, horses, mountains, fish, food, door, etc. Each category contains 100 images of size 192×128 or 128×192 in the JPEG format. Corel-5K dataset consists of the first 5000 images, and Corel-10K dataset consists of the 10,000 images.

COREL 10k image database download page - http://www.ci.gxnu.edu.cn/cbir/Dataset.aspx Copy the first 5000 images and paste it to a new folder, it will become your COREL 5k dataset.

WANG (1k) image dataset download - http://wang.ist.psu.edu/~jwang/test1.tar

name the dataset folder as corel10k , corel5k , wang.

STEP-1 (running the project)
Download all the codes and dataset into the MATLAB directory.
copy any image from the given dataset and paste it in matlab directory as query.jpg.
Run projectmain.m
Wait for 1-2 minute and you will get the related images to your search images.
STEP -2 (explanation of code)
projectmain.m - It is the main file, it calls all the functions. This file calculates the mean of all images and segregates them accordingly on basis of mean and sd value of query image. Selected images and their corresponding gray images are stored in new folders named as 'selected' and 'selectedGray'

start.m - It reads the query image and saves the gray and edge version of same image, to be used by other function for processing.

resize.m - It resize all the images to 256x256 size and saves them to a new folder called 'samesize'

lbpfeature.m - It calculates the lbp features for all the images and compare them with the feature of query images.3x3 mask is used for lbp feature After calculation result are stored in a array

cannyedge.m - It reads all the images, process them (convert rgb to hsv, running canny edge on V channel and converting back to rgb) and save the edge image in a new folder named as 'selectedEdge'

edgefeature.m - This function calculates histogram(r,g,b channels) of all the edge images and commpares them with histogram of query image. Chi-square similarity is used. After comparison Results are stored in a array

similarity.m - This function normalizes the two arrays obtained from edgefeature and lbpfeature function and adds them. Result is stored in new array. Now the array is sorted and images corresponding to first 10-20 values are shown.

natsort.m - used to sort file name of images