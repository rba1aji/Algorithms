import java.util.*;
class Prims{
	int inf=Integer.MAX_VALUE;
	int n=new Scanner(System.in).nextInt();
	int[][] weightMatrix=new int[n][n];
	Map<Integer,Boolean>selected=new HashMap<>();
	int[] selectedVertices=new int[n];
	String treeVertices="";
	Prims(){//constructor
		Scanner sc=new Scanner(System.in);
		for(int i=0;i<n;i++){//weightMatrx
			for(int j=0;j<n;j++){
				String c=sc.next();
				weightMatrix[i][j]=(c.equals("inf"))?inf:Integer.parseInt(c);
			}
		}//init selected
		for(int i=0;i<n;i++){
			selected.put(i,false);
		}
	}
	void solve(){
		selected.put(0,true);
		treeVertices+=(char)(0+97)+"(-,-)";
		int noOfEdge=0;
		int compIndex=0;
		while(noOfEdge<n-1){

			for(int i:selected.keySet()){
				if(selected.get(i))continue;
				int t=i,tmin=inf;
				for(int j:selected.keySet()){
		//			System.out.print(selected.get(j)?j:"--");
					if(selected.get(j)){
						//System.out.print(j);
					//&&weightMatrix[i][j]!=0
					if(weightMatrix[j][i]<tmin){
					//	System.out.print(j);
						tmin=weightMatrix[j][i];
						t=j;
					//	System.out.println(t+" "+tmin);
					}
					}
				}
			//	System.out.println("-");
				if(tmin==inf){t=45-97;}//hyphen symbol
			treeVertices+="\t"+(char)(i+97)+"("+(char)(t+97)+","+(tmin==inf?"inf":tmin)+")";
			}
			treeVertices+="\n";
			int min=inf;		
			int x=0,y=0;
			for(int i=0;i<n;i++){
				for(int j=0;j<n&&selected.get(i);j++){
					if(!selected.get(j)&&weightMatrix[i][j]!=0&&(min>weightMatrix[i][j])){
						min=weightMatrix[i][j];
						x=i;
						y=j;
					}
				}
			}
			selected.put(y,true);
			
			noOfEdge++;
			treeVertices+=(char)(y+97)+"("+(char)(x+97)+","+weightMatrix[x][y]+")";
			
		//	treeVertices+="\n";
		}
		System.out.println(treeVertices);
	}
}
public class Primsi {
	public static void main(String[] args) {
		Prims o=new Prims();
		o.solve();
	}
}
