//console.log(1);
//debugger;
selectAlgo=()=>{
//  document.getElementById("input").style.opacity="1";
document.getElementById("inputMatrix").rows="4";
document.getElementById("inputMatrix").value=""; 
document.getElementById("item").value="";
document.getElementById("weight").value="";
document.getElementById("value").value="";
document.getElementById("capacity").value="";//making textarea empty
  
  document.getElementById("output").style.height="0";
  let selected=""+document.getElementById("algoSelection").value;
 // alert(selected);
 if(selected=="default"){   
   document.getElementById("input").style.height="0";
   document.getElementById("knapsackInput").style.height="0";
   }
  else if(selected=="warshalls"){ 
        document.getElementById("knapsackInput").style.height="0";
        document.getElementById("input").style.height="auto";
    document.getElementById("algoType").innerHTML="Warshall's";
    document.getElementById("outputDescription").innerHTML="Application of Warshall's algorithm to the digraph:";
  document.getElementById("inputMatrixType").innerHTML="adjacency";
   document.getElementById("infinityNote").innerHTML="";
   document.getElementById("warshallsButton").innerHTML='<input type="button" value="Find Warshalls Solution" onclick="warshalls()"></input>';
   document.getElementById("floydsButton").innerHTML="";
   document.getElementById("primsButton").innerHTML="";

    }
    else if(selected=="floyds"){ 
      document.getElementById("knapsackInput").style.height="0";
        document.getElementById("input").style.height="auto";
        document.getElementById("algoType").innerHTML="Floyd's";
         document.getElementById("outputDescription").innerHTML="Application of Floyd's algorithm to the digraph:";
   document.getElementById("inputMatrixType").innerHTML="weight";
   document.getElementById("infinityNote").innerHTML="<br/>note: enter inf for &#8734;";
   document.getElementById("floydsButton"). innerHTML='<input type="button" value="Find Floyds Solution" onclick="floyds()"></input>';
   document.getElementById("warshallsButton"). innerHTML="";
   document.getElementById("primsButton").innerHTML="";

      }
      else if(selected=="knapsack"){ 
        document.getElementById("input").style.height="0";
        document.getElementById("knapsackInput").style.height="auto";
        }
        else if(selected=="prims"){
      document.getElementById("inputMatrix").rows="6";
          document.getElementById("input").style.height="auto";
          document.getElementById("knapsackInput").style.height="0";
          document.getElementById("algoType").innerHTML="Prim's";
          document.getElementById("outputDescription").innerHTML="Application of Floyd's algorithm to the digraph:";
   document.getElementById("inputMatrixType").innerHTML="weight";
   document.getElementById("infinityNote").innerHTML="<br/>note: enter inf for &#8734;";
   document.getElementById("primsButton").innerHTML='<input type="button" value="Find Prims Solution" onclick="prims()"></input>';
   document.getElementById("warshallsButton"). innerHTML="";
    document.getElementById("floydsButton"). innerHTML="";
     document.getElementById("outputDescription").innerHTML="Application of Prim's algorithm:";
          }
  }
  
  
  
class Knapsack {
  constructor(
       item,weight,value, 
       capacity,n,resTable,resString,
       max_i,max_j  ){
    //replaceAll(/\n+/g,"\n").
     this.item=("0\n"+item).split("\n").map(parseFun);
     this.n=item.split("\n").length+1;
     this.weight=weight.split("\n").map(parseFun);
     this.value=value.split("\n").map(parseFun);
     this.capacity=parseInt(capacity,10)+1;//checkNaN
     this.resTable=new Array(n);
     this.resString="";
     this.max_i=0;
     this.max_j=0;
     function parseFun(item){
      var val= parseInt(item,10);
      if(isNaN(val)){
        alert("Enter valid input");
        document.getElementById("output").style.height="0";
          constructor ();
        }
      else return val;
       }
     
    }
    solve=()=>{
      let max=0;
      for(let i=0;i<this.n;i++){
        this.resTable[i]=new Array(this.capacity);
        }
   //   alert(this.n+" \n"+this.weight+"\n"+this.value+"\n"+this.capacity+"\n"+this.resTable);
         for(let i=0;i<this.n;i++){
           for(let j=0;j<this.capacity;j++){
             let val=0;
             if(i==0||j==0){
					val=0;
				}
		     else if(j<this.weight[i-1]){
					val=this.resTable[i-1][j];
						}
		     else{
					val=Math.max(this.resTable[i-1][j],this.value[i-1]+this.resTable[i-1][j-this.weight[i-1]]);
					}
					this.resTable[i][j]=val;
                    if(max<=val){
                      max=val;
                      this.max_i=i;
                      this.max_j=j;
                      }
             }
           }
  //       alert(this.n+" \n"+this.weight+"\n"+this.value+"\n"+this.capacity+"\n"+this.resTable);
      }
      showResult=()=>{
        let s="";
        s+='<table style=" width:100%; height:40vh; border-collapse: collapse;  overflow-x:auto; " id="knapsackTable">';
         s+='<tr><th style="border:0;"> </th><th style="border:0;" colspan=" '+(this.capacity)+' "> Capacity j</th></tr>';
        s+='<th>i</th>';
        for(let i=0;i<this.capacity;i++){
          s+="<th>"+i+"</th>";
          }
        for(let i=0;i<this.n;i++){
          s+="<tr><th>"+this.item[i]+"</th>";
          for(let j=0;j<this.capacity;j++){
            if(i==this.max_i&&j==this.max_j){
              s+="<td><b>"+this.resTable[i][j]+"</b></td>";
              }
            else s+="<td>"+this.resTable[i][j]+"</td>";
            }
            s+="</tr>";
          }
          s+="</table><br/><br/>";
          s+="<style>  #knapsackTable th{ border:2px solid black;       border-collapse: collapse;  width:auto; } #knapsackTable td{width:auto;  }  </style>";
          this.resString=s;
   //     alert(this.resString);
          document.getElementById("resultBox").innerHTML=this.resString;
        }
  }
  
 knapsack=()=>{
  //input debugging purpose
/*  document.getElementById("item").value="1\n2\n3\n4";
  document.getElementById("weight").value="2\n1\n3\n2";
  document.getElementById("value").value="12\n10\n20\n15";
  //document.getElementById("capacity").value="5";*/


  document.getElementById("output").style.height="100%";
  document.getElementById("outputDescription"). innerHTML="<br>Solution of Knapsack problem by dynamic programming algorithm:";
  document.getElementById("resultBox").style.width="85vw";
  let ob=new Knapsack(document.getElementById("item").value,document.getElementById("weight").value, document.getElementById("value").value, document.getElementById("capacity").value);
  ob.solve();
  ob.showResult();
  }
  
  
 warshalls=()=>{
  let adjacencyMatrix=readAdjacencyMatrix();
 // alert(adjacencyMatrix);
  let result=""+warshallsSolve(adjacencyMatrix);
  //alert(result);
  document.getElementById("output").style.height="100%";
  document.getElementById("resultBox").innerHTML=makeUpdatedBold(result,"R");
  //alert(result);
  }
floyds=() =>{
   let weightMatrix=readWeightMatrix();
    let result=""+floydsSolve(weightMatrix);
    document.getElementById("output").style.height="100%";
	document.getElementById("resultBox").innerHTML = makeUpdatedBold(result,"D");
}

makeUpdatedBold=(resultString,flag)=>{
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


warshallsSolve = (adjacencyMatrix) => {
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

floydsSolve = (weightMatrix) => {
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

printMatrix = (arr) => {
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

readAdjacencyMatrix = () => {
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
                    document.getElementById("output").style.height="0";
                    return;
                   }
               else tempArr.push(temp);
		}
		adjacencyMatrix.push(tempArr);
      }
    return adjacencyMatrix;
  }

readWeightMatrix=()=>{
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
document.getElementById("output").style.height="0";
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

class Prims{
  constructor(
        inf ,  weightMatrix, n, selected, 
        applicationStr, totMinCost,
        connection, result){ 
        this.inf=Number.MAX_VALUE;
        this.weightMatrix=readWeightMatrix();
        this.n=this.weightMatrix.length;
        this.selected=new Map();
        this.applicationStr="";
        this.totMinCost=0;
        this.connection=[];
        this.result="";
        for(let i=0;i<this.n;i++){
          this.selected.set(i,false);
          }
   }
   solve=()=>{
     this.selected.set(0,false);
     let s=`<tabel>
             <tr>
              <th>Tree vertices</th> 
              <th>Remaining vertices</th>
              <th>Graph paths</th>
             </tr>`;
        s+=`<tr><td>{String.fromCharCode(0+97)}(-,-)</td>`;
        let NoOfEdges=n-1;
        while(noOfEdges--){
          
          }
     }
}

prims=()=>{
  //debugg input
    document.getElementById("inputMatrix").value="0 3 inf inf 6 5\n3 0 1 inf inf 4\ninf 1 0 6 inf 4\ninf inf 6 0 8 inf\n6 inf inf 8 inf 2\n5 4 4 5 2 0";
   document.getElementById("output").style.height="100%";
  let ob=new Prims();
  ob.solve();
        //  alert (0);        
      //    alert (ob.selected.get(0));
  document.getElementById("resultBox").innerHTML=ob.result; 
 
  }
