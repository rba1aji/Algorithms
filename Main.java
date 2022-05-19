//author: rba1aji
import java.util.*;
class Floyds{
	int infy=Integer.MAX_VALUE;
	int n=readEdges();
	int[][] weightMatrix=new int[n][n];
	int[][] resultMatrix=new int[n][n];
	Stack<int[][]>digraphs=new Stack<>();
	int count=0;
	
	void solve(){
		Set<int[]>intermediate=new HashSet<>();
		for(int i=0;i<n;i++){
			int[] tempArr=new int[i+1];
			for(int j=0;j<=i;j++){
				tempArr[j]=j;
			}
			intermediate.add(tempArr);
		}
		
		digraphs.push(weightMatrix);
		int[][] ta=weightMatrix;
		printMatrix(ta);
		for(int[] a:intermediate){
			for(int imt:a){
				for(int i=0;i<n;i++){
					for(int j=0;j<n;j++){
						if(i==j||ta[i][imt]==infy||ta[imt][j]==infy){}
						else{
							ta[i][j]=Math.min(ta[i][j],ta[i][imt]+ta[imt][j]);
						}
					}
				}
			}
			printMatrix(ta);
			digraphs.push(ta);
		}
	}
	
	void printDigraphs(){
		int k=0;
		while(!digraphs.isEmpty()){
			System.out.println("\n"+"D("+ k++ +")");
			for(int[] i:digraphs.pop()){
				for(int j:i){
					System.out.print(j+" ");
				}
				System.out.println();
			}
		}
	}
	
	void printMatrix(int[][] a){
		System.out.println("\n"+"D("+ count++ +")");
		for(int[] i:a){
			for(int j:i){
				System.out.print((j==infy?"i":j)+" ");
			}
			System.out.println();
		}
		System.out.println();
	}
	
	void printResultMatrix(){
		resultMatrix=digraphs.peek();
		System.out.println("Distance matrix of shortest paths: ");
		for(int[] i:resultMatrix){
			for(int j:i){
				System.out.print(j+" ");
			}
			System.out.println();
		}
	}
	
	void readWeightMatrix(){
		Scanner sc=new Scanner(System.in);
		System.out.println("note: put i for infinity\nWeight Matrix: ");
		for(int i=0;i<n;i++){
			for(int j=0;j<n;j++){
				try{
					weightMatrix[i][j]=sc.nextInt();//BUG: Not only i for all not int input it throws.
				}
				catch(InputMismatchException e){
				weightMatrix[i][j]=infy;
				sc.next();
				}
			}
		}
	}
		
	int readEdges(){
		System.out.println("No. of edges:");
		return new Scanner(System.in).nextInt();
	}
	
}
public class Main{
	public static void main(String[] args) {
		Floyds ob=new Floyds();
		ob.readWeightMatrix();
		ob.solve();
		//ob.printResultMatrix();
	//	ob.printDigraphs();
	}
}
