import java.util.*;
class Knapsack{
	int n=new Scanner(System.in).nextInt();
	int[] item=new int[n+1];
	int[] weight=new int[n+1];
	int[] value=new int[n+1];
	int capacity=new Scanner(System.in).nextInt();
	int[][] resultTable=new int[n+1][capacity+1];
	Knapsack(){
		Scanner sc=new Scanner(System.in);
		for(int i=1;i<n+1;i++){
			weight[i]=sc.nextInt();
		}
		for(int i=1;i<n+1;i++){
			value[i]=sc.nextInt();
		}
	}
	void solve(){
		for(int i=0;i<resultTable.length;i++){
			for(int j=0;j<resultTable[i].length;j++){
				
				if(i==0||j==0){
					resultTable[i][j]=0;
				}
				
				else{
					if(j<weight[i]){
						resultTable[i][j]=resultTable[i-1][j];
				}
					else{
					resultTable[i][j]=Math.max(resultTable[i-1][j],value[i]+resultTable[i-1][j-weight[i]]);
					}
				}
			}
		}
	}
	void showResult(){
		for(int i=0;i<n+1;i++){
			for(int j=0;j<capacity+1;j++){
				System.out.print(resultTable[i][j]+" ");
			}
			System.out.println();
		}
	}
}
public class Knapsacki{
	public static void main(String[] args) {
		Knapsack o=new Knapsack();
		o.solve();
		o.showResult();
	}
}
