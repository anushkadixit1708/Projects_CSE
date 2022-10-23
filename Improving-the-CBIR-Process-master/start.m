function start()
query1 = imread('query.jpg');
A = imresize(query1, [256 256]); 
imwrite(A,'query1.jpg');
query = imread('query1.jpg');
a=rgb2gray(query);
filename1=sprintf('querygray.jpg');
[H S V]=rgb2hsv(query);
b=edge(V,'Canny');
c=hsv2rgb(H,S,b);
filename2=sprintf('queryedge.jpg');
imwrite(a,filename1);
imwrite(c,filename2);
end