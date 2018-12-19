let dataSet = [];
function loadDataset(file)
{
    const rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                const allText = rawFile.responseText;
                dataSet = dataToArray(allText)
            }
        }
    }
    rawFile.send(null);
}


function dataToArray(data){
  let dataArray = [];
  let split = data.replace( /\r?\n|\r/g, "" ).split(" ");
  for(let i=0; i<split.length; i += 2){
    dataArray.push(createPoint(split[i], split[i+1]));
  }
  return dataArray;
}

function createPoint(x, y){
  let id = `${x}_${y}`
  return { x, y, id, };
}

loadDataset("./dataset.tsv");
shortestPath.calculate(dataSet);
