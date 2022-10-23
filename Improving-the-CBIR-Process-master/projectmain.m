mkdir samesize
mkdir selected
mkdir selectedGray
mkdir selectedEdge
start();
resize();

FileList1 = dir(fullfile('samesize', '*.jpg'));
F1 = natsortfiles({FileList1.name});
nBand=1;
meanEachImage=arrayfun(@(x) mean(reshape(imread(cell2mat(fullfile('samesize',F1(x)))),[],nBand)), (1:numel(F1))','UniformOutput',false);
query = imread('query1.jpg');
meanofquery =int16(mean2(query));
sdofquery = int16(std2(query));
%lc and hc
lowrange=meanofquery-sdofquery;
highrange=meanofquery+sdofquery;
array1=int16([]);
for i=1:1000
    if(lowrange<cell2mat(meanEachImage(i)) && cell2mat(meanEachImage(i))<highrange)
        array1=[array1,meanEachImage(i),i];
        a=imread(cell2mat(fullfile('samesize',F1(i))));
        f=rgb2gray(imread(cell2mat(fullfile('samesize',F1(i)))));
        filename = sprintf('selected/myimage%02d.jpg',i);
        filename1 = sprintf('selectedGray/mygrayimage%02d.jpg',i);
        imwrite(a,filename);
        imwrite(f,filename1);
    end
end
array2=lbpfeature();
cannyedge();
array3=edgefeature();
similarity(array2,array3);