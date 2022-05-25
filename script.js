function floyds() {
   let weightMatrix=readMatrix();
    let result=""+solve(weightMatrix);
	document.getElementById("digraphs").innerHTML = makeUpdatedBold(result);
   document.getElementById("output").style.opacity="1";
}

function makeUpdatedBold(resultString){
  let result="";
  let regex= /[D]{1}[(]{1}[0-9]{1}[)]{1}\n/g;
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
    return result.replaceAll("\n","<br>");
  }


function solve(weightMatrix) {
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

function readMatrix() {
	let weightMatrixString = document.getElementById("weightMatrix").value;;
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