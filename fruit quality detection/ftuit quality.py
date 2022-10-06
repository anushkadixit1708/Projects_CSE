
import cv2
import matplotlib.pyplot as plt
import cvlib as cv
from cvlib.object_detection import draw_bbox
from PIL import Image
import numpy as np
import tkinter
import tkinter.filedialog
import os
from copy import deepcopy
print("Please wait Processing....")
kernelOpen=np.ones((5,5))
kernelClose=np.ones((20,20))
root = tkinter.Tk()
root.withdraw() 

currdir = os.getcwd()
tempdir =tkinter.filedialog.askopenfilename(parent=root, initialdir=currdir, title='Please select a Fruits Image')
if len(tempdir) > 0:
    print ("You chose %s" % tempdir)
    print("Please wait Processing....")

    
iml = cv2.imread(tempdir,cv2.IMREAD_COLOR)

frame=iml
edge_img=deepcopy(iml)

edged = cv2.Canny(edge_img,50,100)
edged = cv2.dilate(edged, None, iterations=1)
edged = cv2.erode(edged, None, iterations=1)
 

cnts, h = cv2.findContours(edged.copy(), cv2.RETR_EXTERNAL,cv2.CHAIN_APPROX_SIMPLE)

max_contA=cv2.contourArea(cnts[0])
max_cont=max(cnts,key=cv2.contourArea)

for i in range(len(cnts)):
    	x,y,w,h=cv2.boundingRect(max_cont)
    	cv2.rectangle(edge_img,(x,y),(x+w,y+h),(0,0,255), 2)
croppedk=frame[y:y+h,x:x+w]


cv2.imshow('Edges',edge_img)
frame=edge_img

#freshness
hsv = cv2.cvtColor(frame, cv2.COLOR_BGR2HSV)
     

lower_red = np.array([0,50,50])
upper_red = np.array([10,255,255])
redmask1 = cv2.inRange(hsv, lower_red, upper_red)
lower_red = np.array([170,50,50])
upper_red = np.array([180,255,255])
redmask2 = cv2.inRange(hsv, lower_red, upper_red)
redmask=redmask1+redmask2
maskOpen=cv2.morphologyEx(redmask,cv2.MORPH_OPEN,kernelOpen)
maskClose=cv2.morphologyEx(maskOpen,cv2.MORPH_CLOSE,kernelClose)
maskFinal=maskClose
cv2.imshow('Red_Mask:',maskFinal)
cnt_r=0
for r in redmask:
	cnt_r=cnt_r+list(r).count(255)
#print ("Redness ",cnt_r)



lower_green=np.array([36,25,25])
upper_green=np.array([70,255,255])
greenmask = cv2.inRange(hsv, lower_green, upper_green)
cv2.imshow('Green_Mask:',greenmask)
cnt_g=0
for g in greenmask:
	cnt_g=cnt_g+list(g).count(255)
#print ("Greenness ",cnt_g)


lower_yellow=np.array([20,50,50])
upper_yellow=np.array([30,255,255])
yellowmask = cv2.inRange(hsv, lower_yellow, upper_yellow)
cv2.imshow('Yellow_Mask:',yellowmask)
cnt_y=0
for y in yellowmask:
	cnt_y=cnt_y+list(y).count(255)
#print ("Yellowness ",cnt_y)


#Calculate ripeness
tot_area=cnt_r+cnt_y+cnt_g
rperc=cnt_r/tot_area
yperc=cnt_y/tot_area
gperc=cnt_g/tot_area


glimit=0.5
ylimit=0




#fruit detection
bbox, label, conf = cv.detect_common_objects(iml)
k=0
ab=[]
for i in label:
    if i in ['apple','banana','mango','grapes']:
        pass
    else:
        ab.append(k)
        #print('Removed {}'%i)
    k+=1
for i in range(len(ab)):
    label.pop(ab(len(ab)-i-1));
    bbox.pop(ab(len(ab)-i-1));
    conf.pop(ab(len(ab)-i-1));
out=Image.open(tempdir)
k=0
print("Please wait dispalying completely analysed labeled image")
print(label)


#quality detection
for i in bbox:
    til=out.crop(i)
    #til=cv2.cvtColor(til,cv2.IMREAD_COLOR)
    pixels = til.getdata()          # get the pixels as a flattened sequence
    black_thresh = 100
    nblack = 0
    for pixel in pixels:
        if sum(pixel) < black_thresh:
            nblack += 1
    n = len(pixels)
    #print(nblack)
    
    #cv2.putText(iml,label, (i[0]+40,i[1]+40), cv2.FONT_HERSHEY_SIMPLEX, 0.6,(50,50,255),2,cv2.LINE_AA)
    if (nblack / float(n)) > 0.05:
        print("mostly spoiled")
        cv2.putText(iml,"Mostly Spoiled!!!", (i[0]+40,i[1]+40), cv2.FONT_HERSHEY_SIMPLEX, 0.6,(50,50,255),2,cv2.LINE_AA)
    else:
        cv2.putText(iml,"Good Quality!!!", (i[0]+40,i[1]+40), cv2.FONT_HERSHEY_SIMPLEX, 0.6,(50,255,0),2,cv2.LINE_AA)
    til.show()
    k+=1

    cv2.imshow('image',iml)


if gperc>glimit:
	print ("Low Ripeness")
elif yperc>ylimit:
	print ("High Ripeness")
else:
	print ("Medium Ripeness") 











    



