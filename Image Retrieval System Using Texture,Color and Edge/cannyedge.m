function cannyedge()
FileList3 = dir(fullfile('selected', '*.jpg'));
F3 = natsortfiles({FileList3.name});
for iFile = 1:numel(F3)
  File3 = fullfile('selected', F3(iFile));
  Img3  = imread(cell2mat(File3));
  [H S V]=rgb2hsv(Img3);
  a=edge(V,'Canny');
  b=hsv2rgb(H,S,a);
  filename3=sprintf('selectedEdge/myimage%02d.jpg',iFile);
  imwrite(b,filename3);
end
end