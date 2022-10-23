function resize()
prompt = 'What dataset u want to choose? - (enter corel10k OR corel5k OR wang) ';
str = input(prompt,'s');

FileList = dir(fullfile(str, '*.jpg'));
F = natsortfiles({FileList.name});
Result   = cell(1, numel(F));
for iFile = 1:numel(F)
  File = fullfile(str, F(iFile));
  Img  = imread(cell2mat(File));
  J = imresize(Img, [256 256]); 
  filename2=sprintf('samesize/myimage%02d.jpg',iFile);
  imwrite(J,filename2);
end
end