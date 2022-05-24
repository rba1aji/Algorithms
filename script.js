function floyds() {
    let result=""+solve(readMatrix());
	document.getElementById("digraphs").innerHTML = result;
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
	const weightMatrix1D = weightMatrixString.replace(/  +/g, ' ').replaceAll("\n", " ") .split(" ");
	let n = Math.sqrt(weightMatrix1D.length);
	let weightMatrix = [];
	let k = 0;
	for (let i = 0; i < n; i++) {
		let tempArr = [];
		for (let j = 0; j < n; j++) {
			if (weightMatrix1D[k] == "inf") tempArr.push(Number.MAX_VALUE);
			else tempArr.push(parseInt(weightMatrix1D[k]));
			k++;
		}
		weightMatrix.push(tempArr);
	}
	return weightMatrix;
}