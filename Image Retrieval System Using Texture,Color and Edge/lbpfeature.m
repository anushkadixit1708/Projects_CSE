function array2=lbpfeature()
clc
query1=imread('querygray.jpg');
lbpFeatures = extractLBPFeatures(query1);

array2=[];
FileList2 = dir(fullfile('selectedGray', '*.jpg'));
F2 = natsortfiles({FileList2.name});

for iFile = 1:numel(F2)
  File2 = fullfile('selectedGray', F2(iFile));
  Img2  = imread(cell2mat(File2));
  lbpFeatures1 = extractLBPFeatures(Img2);
  A=abs(lbpFeatures-lbpFeatures1);
  B=sum(A,'all');
  array2=[array2,B];
end
end