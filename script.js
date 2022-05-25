function selectAlgo(){
  //alert(1);
  document.getElementById("input").style.opacity="1";
  document.getElementById("inputMatrix").value="";
  document.getElementById("output").style.opacity="0";
  let selected=""+document.getElementById("algoSelection").value;
 // alert(selected);
 if(selected=="default"){
   document.getElementById("input").style.opacity="0";
   }
  else if(selected=="warshalls"){
    document.getElementById("algoType").innerHTML="Warshall's";
  document.getElementById("inputMatrixType").innerHTML="adjacency";
   document.getElementById("infinityNote").innerHTML="";
   document.getElementById("warshallsButton").style.cssText="auto";
   document.getElementById("floydsButton").style.cssText="width:0; font-size:0; opacity:0";
    }
    else if(selected=="floyds"){
      document.getElementById("algoType").innerHTML="Floyd's";
   document.getElementById("inputMatrixType").innerHTML="weight";
   document.getElementById("infinityNote").innerHTML="<br/>note: enter inf for &#8734;";
   document.getElementById("floydsButton").style.cssText="auto";
   document.getElementById("warshallsButton").style.cssText="width:0; font-size:0; opacity:0";
      }
  }
function warshalls(){
  let adjacencyMatrix=readAdjacencyMatrix();
 // alert(adjacencyMatrix);
  let result=""+warshallsSolve(adjacencyMatrix);
  //alert(result);
  document.getElementById("digraphs").innerHTML=makeUpdatedBold(result,"R");
  //alert(result);
  document.getElementById("output").style.opacity="1";
  }
function floyds() {
   let weightMatrix=readWeightMatrix();
    let result=""+floydsSolve(weightMatrix);
	document.getElementById("digraphs").innerHTML = makeUpdatedBold(result,"D");
   document.getElementById("output").style.opacity="1";
}

function makeUpdatedBold(resultString,flag){
  let result="";
  let regex= /[DR]{1}[(]{1}[0-9]{1}[)]{1}\n/g;
  let arr=resultString.replaceAll(regex,"").split("\n\n");
  result+="<u>D(0)\twith\tintermediates: none</u>\n"+arr[0];

  for(let i=1;i<arr.length-1;i++){
      let cmatrix=arr[i].split(" ");
      let pmatrix=arr[i-1].split(" ");
      result+="\n\n<u>D("+i+")\twith\tintermediates: ";
      for(let z=0;z<i;z++){
        result+=String.fromCharCode(z+97)+" ";
        }
        result+="</u>\n";
      for(let j=0;j<cmatrix.length;j++){
        if(cmatrix[j]!=pmatrix[j]){
          result+=new String(cmatrix[j]).bold()+" ";
          }
          else result+=cmatrix[j]+" ";
        }
    }
    if(flag=="R") return result.replaceAll("\n","<br>").replaceAll("D","R");
    return result.replaceAll("\n","<br>");
  }


function warshallsSolve(adjacencyMatrix){
  let digraphs = "";
	let n = adjacencyMatrix.length;
	let intermediate = [];
	for (let i = 0; i < n; i++) {
		let tempArr = [];
		for (let j = 0; j <= i; j++) {
			tempArr.push(j);
		}
		intermediate.push(tempArr);
	}
	let ta = adjacencyMatrix;
	digraphs += "R(0)\n" + printMatrix(ta) + "\n";
	for (let a = 0; a < intermediate.length; a++) {
		for (let b = 0; b < intermediate[a].length; b++) {
			let imt = intermediate [a][b];
			for (let i = 0; i < n; i++) {
				for (let j = 0; j < n; j++) {
					if(i==imt||j==imt||ta[i][j]==1||ta[i][imt]==0){}
						else if(ta[i][imt]==1&&ta[imt][j]==1){
							ta[i][j]=1;
						}
				}
			}
		}
		digraphs += "R(" + (a+1) +")\n" + printMatrix(ta) + "\n";
	}
	return digraphs;
  }

function floydsSolve(weightMatrix) {
	let digraphs = "";
	let n = weightMatrix.length;
	let intermediate = [];
	for (let i = 0; i < n; i++) {
		let tempArr = [];
		for (let j = 0; j <= i; j++) {
			tempArr.push(j);
		}
		intermediate.push(tempArr);
	}
	let ta = weightMatrix;
	digraphs += "D(0)\n" + printMatrix(ta) + "\n";
	for (let a = 0; a < intermediate.length; a++) {
		for (let b = 0; b < intermediate[a].length; b++) {
			let imt = intermediate [a][b];
			for (let i = 0; i < n; i++) {
				for (let j = 0; j < n; j++) {
					if (i == j || ta[i][imt] == Number.MAX_VALUE || ta[imt][j] == Number.MAX_VALUE) {}
					else {
						ta[i][j] = Math.min(ta[i][j], ta[i][imt] + ta[imt][j]);
					}
				}
			}
		}
		digraphs += "D(" + (a+1) +")\n" + printMatrix(ta) + "\n";
	}
	return digraphs;
}

function printMatrix(arr) {
	let result = "";
	for (let i = 0; i < arr.length; i++) {
		for (let j = 0; j < arr[i].length; j++) {
			if (arr[i][j] == Number.MAX_VALUE) result += "inf ";
			else result += arr[i][j] + " ";
		}
		result += "\n";
	}
	return result;
}

function readAdjacencyMatrix(){
  let adjacencyMatrixString=document.getElementById("inputMatrix").value;
  const adjacencyMatrix1D=adjacencyMatrixString.replaceAll("\n", " ").replaceAll(/ +/g, " ").split(" ");
  let n=Math.sqrt(adjacencyMatrix1D.length);
  let adjacencyMatrix=[];
  let k=0;
  for(let i=0;i<n;i++){
    let tempArr=[];
    for(let j=0;j<n;j++){
               let temp=parseInt(adjacencyMatrix1D[k++]);
               if(Number.isNaN(temp)||temp>1){
                    alert("ENTER VALID ADJACENCY MATRIX\ntip:\nadjacency matrix can only contain 0s and 1s\nadjacency matrix must be square matrix\ntry removing white spaces after last element");
                    document.getElementById("output").style.opacity="0";
                    return;
                   }
               else tempArr.push(temp);
		}
		adjacencyMatrix.push(tempArr);
      }
    return adjacencyMatrix;
  }

function readWeightMatrix() {
	let weightMatrixString = document.getElementById("inputMatrix").value;
	const weightMatrix1D = weightMatrixString.replaceAll("\n", " ").replaceAll(/ +/g, " ").split(" ");
	//last character need to remove ws
	let n = Math.sqrt(weightMatrix1D.length);
	let weightMatrix = [];
	let k = 0;
	for (let i = 0; i < n; i++) {
		let tempArr = [];
		for (let j = 0; j < n; j++) {
			if (weightMatrix1D[k] == "inf") tempArr.push(Number.MAX_VALUE);
			else{
               let temp=parseInt(weightMatrix1D[k]);
               if(Number.isNaN(temp)){
                    alert("ENTER VALID WEIGHT MATRIX\ntip:\nmake sure you put inf for infinity\nweight matrix must be square matrix\ntry removing white spaces after last element");
document.getElementById("output").style.opacity="0";
                    return;
                   }
               else tempArr.push(temp);
               }
			k++;
		}
		weightMatrix.push(tempArr);
	}
	return weightMatrix;
}