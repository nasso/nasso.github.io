/*

Things to know:

• Transformation:
	- First scale if needed
	- Then set the direction (rotate)
	- Then set the position (translate)
	Or you'll get problems... with... logic and... you'll... rage quit and... JUST DO IT !

*/

// Inner sylvester.js
{
eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('9 17={3i:\'0.1.3\',16:1e-6};l v(){}v.23={e:l(i){8(i<1||i>7.4.q)?w:7.4[i-1]},2R:l(){8 7.4.q},1u:l(){8 F.1x(7.2u(7))},24:l(a){9 n=7.4.q;9 V=a.4||a;o(n!=V.q){8 1L}J{o(F.13(7.4[n-1]-V[n-1])>17.16){8 1L}}H(--n);8 2x},1q:l(){8 v.u(7.4)},1b:l(a){9 b=[];7.28(l(x,i){b.19(a(x,i))});8 v.u(b)},28:l(a){9 n=7.4.q,k=n,i;J{i=k-n;a(7.4[i],i+1)}H(--n)},2q:l(){9 r=7.1u();o(r===0){8 7.1q()}8 7.1b(l(x){8 x/r})},1C:l(a){9 V=a.4||a;9 n=7.4.q,k=n,i;o(n!=V.q){8 w}9 b=0,1D=0,1F=0;7.28(l(x,i){b+=x*V[i-1];1D+=x*x;1F+=V[i-1]*V[i-1]});1D=F.1x(1D);1F=F.1x(1F);o(1D*1F===0){8 w}9 c=b/(1D*1F);o(c<-1){c=-1}o(c>1){c=1}8 F.37(c)},1m:l(a){9 b=7.1C(a);8(b===w)?w:(b<=17.16)},34:l(a){9 b=7.1C(a);8(b===w)?w:(F.13(b-F.1A)<=17.16)},2k:l(a){9 b=7.2u(a);8(b===w)?w:(F.13(b)<=17.16)},2j:l(a){9 V=a.4||a;o(7.4.q!=V.q){8 w}8 7.1b(l(x,i){8 x+V[i-1]})},2C:l(a){9 V=a.4||a;o(7.4.q!=V.q){8 w}8 7.1b(l(x,i){8 x-V[i-1]})},22:l(k){8 7.1b(l(x){8 x*k})},x:l(k){8 7.22(k)},2u:l(a){9 V=a.4||a;9 i,2g=0,n=7.4.q;o(n!=V.q){8 w}J{2g+=7.4[n-1]*V[n-1]}H(--n);8 2g},2f:l(a){9 B=a.4||a;o(7.4.q!=3||B.q!=3){8 w}9 A=7.4;8 v.u([(A[1]*B[2])-(A[2]*B[1]),(A[2]*B[0])-(A[0]*B[2]),(A[0]*B[1])-(A[1]*B[0])])},2A:l(){9 m=0,n=7.4.q,k=n,i;J{i=k-n;o(F.13(7.4[i])>F.13(m)){m=7.4[i]}}H(--n);8 m},2Z:l(x){9 a=w,n=7.4.q,k=n,i;J{i=k-n;o(a===w&&7.4[i]==x){a=i+1}}H(--n);8 a},3g:l(){8 S.2X(7.4)},2d:l(){8 7.1b(l(x){8 F.2d(x)})},2V:l(x){8 7.1b(l(y){8(F.13(y-x)<=17.16)?x:y})},1o:l(a){o(a.K){8 a.1o(7)}9 V=a.4||a;o(V.q!=7.4.q){8 w}9 b=0,2b;7.28(l(x,i){2b=x-V[i-1];b+=2b*2b});8 F.1x(b)},3a:l(a){8 a.1h(7)},2T:l(a){8 a.1h(7)},1V:l(t,a){9 V,R,x,y,z;2S(7.4.q){27 2:V=a.4||a;o(V.q!=2){8 w}R=S.1R(t).4;x=7.4[0]-V[0];y=7.4[1]-V[1];8 v.u([V[0]+R[0][0]*x+R[0][1]*y,V[1]+R[1][0]*x+R[1][1]*y]);1I;27 3:o(!a.U){8 w}9 C=a.1r(7).4;R=S.1R(t,a.U).4;x=7.4[0]-C[0];y=7.4[1]-C[1];z=7.4[2]-C[2];8 v.u([C[0]+R[0][0]*x+R[0][1]*y+R[0][2]*z,C[1]+R[1][0]*x+R[1][1]*y+R[1][2]*z,C[2]+R[2][0]*x+R[2][1]*y+R[2][2]*z]);1I;2P:8 w}},1t:l(a){o(a.K){9 P=7.4.2O();9 C=a.1r(P).4;8 v.u([C[0]+(C[0]-P[0]),C[1]+(C[1]-P[1]),C[2]+(C[2]-(P[2]||0))])}1d{9 Q=a.4||a;o(7.4.q!=Q.q){8 w}8 7.1b(l(x,i){8 Q[i-1]+(Q[i-1]-x)})}},1N:l(){9 V=7.1q();2S(V.4.q){27 3:1I;27 2:V.4.19(0);1I;2P:8 w}8 V},2n:l(){8\'[\'+7.4.2K(\', \')+\']\'},26:l(a){7.4=(a.4||a).2O();8 7}};v.u=l(a){9 V=25 v();8 V.26(a)};v.i=v.u([1,0,0]);v.j=v.u([0,1,0]);v.k=v.u([0,0,1]);v.2J=l(n){9 a=[];J{a.19(F.2F())}H(--n);8 v.u(a)};v.1j=l(n){9 a=[];J{a.19(0)}H(--n);8 v.u(a)};l S(){}S.23={e:l(i,j){o(i<1||i>7.4.q||j<1||j>7.4[0].q){8 w}8 7.4[i-1][j-1]},33:l(i){o(i>7.4.q){8 w}8 v.u(7.4[i-1])},2E:l(j){o(j>7.4[0].q){8 w}9 a=[],n=7.4.q,k=n,i;J{i=k-n;a.19(7.4[i][j-1])}H(--n);8 v.u(a)},2R:l(){8{2D:7.4.q,1p:7.4[0].q}},2D:l(){8 7.4.q},1p:l(){8 7.4[0].q},24:l(a){9 M=a.4||a;o(1g(M[0][0])==\'1f\'){M=S.u(M).4}o(7.4.q!=M.q||7.4[0].q!=M[0].q){8 1L}9 b=7.4.q,15=b,i,G,10=7.4[0].q,j;J{i=15-b;G=10;J{j=10-G;o(F.13(7.4[i][j]-M[i][j])>17.16){8 1L}}H(--G)}H(--b);8 2x},1q:l(){8 S.u(7.4)},1b:l(a){9 b=[],12=7.4.q,15=12,i,G,10=7.4[0].q,j;J{i=15-12;G=10;b[i]=[];J{j=10-G;b[i][j]=a(7.4[i][j],i+1,j+1)}H(--G)}H(--12);8 S.u(b)},2i:l(a){9 M=a.4||a;o(1g(M[0][0])==\'1f\'){M=S.u(M).4}8(7.4.q==M.q&&7.4[0].q==M[0].q)},2j:l(a){9 M=a.4||a;o(1g(M[0][0])==\'1f\'){M=S.u(M).4}o(!7.2i(M)){8 w}8 7.1b(l(x,i,j){8 x+M[i-1][j-1]})},2C:l(a){9 M=a.4||a;o(1g(M[0][0])==\'1f\'){M=S.u(M).4}o(!7.2i(M)){8 w}8 7.1b(l(x,i,j){8 x-M[i-1][j-1]})},2B:l(a){9 M=a.4||a;o(1g(M[0][0])==\'1f\'){M=S.u(M).4}8(7.4[0].q==M.q)},22:l(a){o(!a.4){8 7.1b(l(x){8 x*a})}9 b=a.1u?2x:1L;9 M=a.4||a;o(1g(M[0][0])==\'1f\'){M=S.u(M).4}o(!7.2B(M)){8 w}9 d=7.4.q,15=d,i,G,10=M[0].q,j;9 e=7.4[0].q,4=[],21,20,c;J{i=15-d;4[i]=[];G=10;J{j=10-G;21=0;20=e;J{c=e-20;21+=7.4[i][c]*M[c][j]}H(--20);4[i][j]=21}H(--G)}H(--d);9 M=S.u(4);8 b?M.2E(1):M},x:l(a){8 7.22(a)},32:l(a,b,c,d){9 e=[],12=c,i,G,j;9 f=7.4.q,1p=7.4[0].q;J{i=c-12;e[i]=[];G=d;J{j=d-G;e[i][j]=7.4[(a+i-1)%f][(b+j-1)%1p]}H(--G)}H(--12);8 S.u(e)},31:l(){9 a=7.4.q,1p=7.4[0].q;9 b=[],12=1p,i,G,j;J{i=1p-12;b[i]=[];G=a;J{j=a-G;b[i][j]=7.4[j][i]}H(--G)}H(--12);8 S.u(b)},1y:l(){8(7.4.q==7.4[0].q)},2A:l(){9 m=0,12=7.4.q,15=12,i,G,10=7.4[0].q,j;J{i=15-12;G=10;J{j=10-G;o(F.13(7.4[i][j])>F.13(m)){m=7.4[i][j]}}H(--G)}H(--12);8 m},2Z:l(x){9 a=w,12=7.4.q,15=12,i,G,10=7.4[0].q,j;J{i=15-12;G=10;J{j=10-G;o(7.4[i][j]==x){8{i:i+1,j:j+1}}}H(--G)}H(--12);8 w},30:l(){o(!7.1y){8 w}9 a=[],n=7.4.q,k=n,i;J{i=k-n;a.19(7.4[i][i])}H(--n);8 v.u(a)},1K:l(){9 M=7.1q(),1c;9 n=7.4.q,k=n,i,1s,1n=7.4[0].q,p;J{i=k-n;o(M.4[i][i]==0){2e(j=i+1;j<k;j++){o(M.4[j][i]!=0){1c=[];1s=1n;J{p=1n-1s;1c.19(M.4[i][p]+M.4[j][p])}H(--1s);M.4[i]=1c;1I}}}o(M.4[i][i]!=0){2e(j=i+1;j<k;j++){9 a=M.4[j][i]/M.4[i][i];1c=[];1s=1n;J{p=1n-1s;1c.19(p<=i?0:M.4[j][p]-M.4[i][p]*a)}H(--1s);M.4[j]=1c}}}H(--n);8 M},3h:l(){8 7.1K()},2z:l(){o(!7.1y()){8 w}9 M=7.1K();9 a=M.4[0][0],n=M.4.q-1,k=n,i;J{i=k-n+1;a=a*M.4[i][i]}H(--n);8 a},3f:l(){8 7.2z()},2y:l(){8(7.1y()&&7.2z()===0)},2Y:l(){o(!7.1y()){8 w}9 a=7.4[0][0],n=7.4.q-1,k=n,i;J{i=k-n+1;a+=7.4[i][i]}H(--n);8 a},3e:l(){8 7.2Y()},1Y:l(){9 M=7.1K(),1Y=0;9 a=7.4.q,15=a,i,G,10=7.4[0].q,j;J{i=15-a;G=10;J{j=10-G;o(F.13(M.4[i][j])>17.16){1Y++;1I}}H(--G)}H(--a);8 1Y},3d:l(){8 7.1Y()},2W:l(a){9 M=a.4||a;o(1g(M[0][0])==\'1f\'){M=S.u(M).4}9 T=7.1q(),1p=T.4[0].q;9 b=T.4.q,15=b,i,G,10=M[0].q,j;o(b!=M.q){8 w}J{i=15-b;G=10;J{j=10-G;T.4[i][1p+j]=M[i][j]}H(--G)}H(--b);8 T},2w:l(){o(!7.1y()||7.2y()){8 w}9 a=7.4.q,15=a,i,j;9 M=7.2W(S.I(a)).1K();9 b,1n=M.4[0].q,p,1c,2v;9 c=[],2c;J{i=a-1;1c=[];b=1n;c[i]=[];2v=M.4[i][i];J{p=1n-b;2c=M.4[i][p]/2v;1c.19(2c);o(p>=15){c[i].19(2c)}}H(--b);M.4[i]=1c;2e(j=0;j<i;j++){1c=[];b=1n;J{p=1n-b;1c.19(M.4[j][p]-M.4[i][p]*M.4[j][i])}H(--b);M.4[j]=1c}}H(--a);8 S.u(c)},3c:l(){8 7.2w()},2d:l(){8 7.1b(l(x){8 F.2d(x)})},2V:l(x){8 7.1b(l(p){8(F.13(p-x)<=17.16)?x:p})},2n:l(){9 a=[];9 n=7.4.q,k=n,i;J{i=k-n;a.19(v.u(7.4[i]).2n())}H(--n);8 a.2K(\'\\n\')},26:l(a){9 i,4=a.4||a;o(1g(4[0][0])!=\'1f\'){9 b=4.q,15=b,G,10,j;7.4=[];J{i=15-b;G=4[i].q;10=G;7.4[i]=[];J{j=10-G;7.4[i][j]=4[i][j]}H(--G)}H(--b);8 7}9 n=4.q,k=n;7.4=[];J{i=k-n;7.4.19([4[i]])}H(--n);8 7}};S.u=l(a){9 M=25 S();8 M.26(a)};S.I=l(n){9 a=[],k=n,i,G,j;J{i=k-n;a[i]=[];G=k;J{j=k-G;a[i][j]=(i==j)?1:0}H(--G)}H(--n);8 S.u(a)};S.2X=l(a){9 n=a.q,k=n,i;9 M=S.I(n);J{i=k-n;M.4[i][i]=a[i]}H(--n);8 M};S.1R=l(b,a){o(!a){8 S.u([[F.1H(b),-F.1G(b)],[F.1G(b),F.1H(b)]])}9 d=a.1q();o(d.4.q!=3){8 w}9 e=d.1u();9 x=d.4[0]/e,y=d.4[1]/e,z=d.4[2]/e;9 s=F.1G(b),c=F.1H(b),t=1-c;8 S.u([[t*x*x+c,t*x*y-s*z,t*x*z+s*y],[t*x*y+s*z,t*y*y+c,t*y*z-s*x],[t*x*z-s*y,t*y*z+s*x,t*z*z+c]])};S.3b=l(t){9 c=F.1H(t),s=F.1G(t);8 S.u([[1,0,0],[0,c,-s],[0,s,c]])};S.39=l(t){9 c=F.1H(t),s=F.1G(t);8 S.u([[c,0,s],[0,1,0],[-s,0,c]])};S.38=l(t){9 c=F.1H(t),s=F.1G(t);8 S.u([[c,-s,0],[s,c,0],[0,0,1]])};S.2J=l(n,m){8 S.1j(n,m).1b(l(){8 F.2F()})};S.1j=l(n,m){9 a=[],12=n,i,G,j;J{i=n-12;a[i]=[];G=m;J{j=m-G;a[i][j]=0}H(--G)}H(--12);8 S.u(a)};l 14(){}14.23={24:l(a){8(7.1m(a)&&7.1h(a.K))},1q:l(){8 14.u(7.K,7.U)},2U:l(a){9 V=a.4||a;8 14.u([7.K.4[0]+V[0],7.K.4[1]+V[1],7.K.4[2]+(V[2]||0)],7.U)},1m:l(a){o(a.W){8 a.1m(7)}9 b=7.U.1C(a.U);8(F.13(b)<=17.16||F.13(b-F.1A)<=17.16)},1o:l(a){o(a.W){8 a.1o(7)}o(a.U){o(7.1m(a)){8 7.1o(a.K)}9 N=7.U.2f(a.U).2q().4;9 A=7.K.4,B=a.K.4;8 F.13((A[0]-B[0])*N[0]+(A[1]-B[1])*N[1]+(A[2]-B[2])*N[2])}1d{9 P=a.4||a;9 A=7.K.4,D=7.U.4;9 b=P[0]-A[0],2a=P[1]-A[1],29=(P[2]||0)-A[2];9 c=F.1x(b*b+2a*2a+29*29);o(c===0)8 0;9 d=(b*D[0]+2a*D[1]+29*D[2])/c;9 e=1-d*d;8 F.13(c*F.1x(e<0?0:e))}},1h:l(a){9 b=7.1o(a);8(b!==w&&b<=17.16)},2T:l(a){8 a.1h(7)},1v:l(a){o(a.W){8 a.1v(7)}8(!7.1m(a)&&7.1o(a)<=17.16)},1U:l(a){o(a.W){8 a.1U(7)}o(!7.1v(a)){8 w}9 P=7.K.4,X=7.U.4,Q=a.K.4,Y=a.U.4;9 b=X[0],1z=X[1],1B=X[2],1T=Y[0],1S=Y[1],1M=Y[2];9 c=P[0]-Q[0],2s=P[1]-Q[1],2r=P[2]-Q[2];9 d=-b*c-1z*2s-1B*2r;9 e=1T*c+1S*2s+1M*2r;9 f=b*b+1z*1z+1B*1B;9 g=1T*1T+1S*1S+1M*1M;9 h=b*1T+1z*1S+1B*1M;9 k=(d*g/f+h*e)/(g-h*h);8 v.u([P[0]+k*b,P[1]+k*1z,P[2]+k*1B])},1r:l(a){o(a.U){o(7.1v(a)){8 7.1U(a)}o(7.1m(a)){8 w}9 D=7.U.4,E=a.U.4;9 b=D[0],1l=D[1],1k=D[2],1P=E[0],1O=E[1],1Q=E[2];9 x=(1k*1P-b*1Q),y=(b*1O-1l*1P),z=(1l*1Q-1k*1O);9 N=v.u([x*1Q-y*1O,y*1P-z*1Q,z*1O-x*1P]);9 P=11.u(a.K,N);8 P.1U(7)}1d{9 P=a.4||a;o(7.1h(P)){8 v.u(P)}9 A=7.K.4,D=7.U.4;9 b=D[0],1l=D[1],1k=D[2],1w=A[0],18=A[1],1a=A[2];9 x=b*(P[1]-18)-1l*(P[0]-1w),y=1l*((P[2]||0)-1a)-1k*(P[1]-18),z=1k*(P[0]-1w)-b*((P[2]||0)-1a);9 V=v.u([1l*x-1k*z,1k*y-b*x,b*z-1l*y]);9 k=7.1o(P)/V.1u();8 v.u([P[0]+V.4[0]*k,P[1]+V.4[1]*k,(P[2]||0)+V.4[2]*k])}},1V:l(t,a){o(1g(a.U)==\'1f\'){a=14.u(a.1N(),v.k)}9 R=S.1R(t,a.U).4;9 C=a.1r(7.K).4;9 A=7.K.4,D=7.U.4;9 b=C[0],1E=C[1],1J=C[2],1w=A[0],18=A[1],1a=A[2];9 x=1w-b,y=18-1E,z=1a-1J;8 14.u([b+R[0][0]*x+R[0][1]*y+R[0][2]*z,1E+R[1][0]*x+R[1][1]*y+R[1][2]*z,1J+R[2][0]*x+R[2][1]*y+R[2][2]*z],[R[0][0]*D[0]+R[0][1]*D[1]+R[0][2]*D[2],R[1][0]*D[0]+R[1][1]*D[1]+R[1][2]*D[2],R[2][0]*D[0]+R[2][1]*D[1]+R[2][2]*D[2]])},1t:l(a){o(a.W){9 A=7.K.4,D=7.U.4;9 b=A[0],18=A[1],1a=A[2],2N=D[0],1l=D[1],1k=D[2];9 c=7.K.1t(a).4;9 d=b+2N,2h=18+1l,2o=1a+1k;9 Q=a.1r([d,2h,2o]).4;9 e=[Q[0]+(Q[0]-d)-c[0],Q[1]+(Q[1]-2h)-c[1],Q[2]+(Q[2]-2o)-c[2]];8 14.u(c,e)}1d o(a.U){8 7.1V(F.1A,a)}1d{9 P=a.4||a;8 14.u(7.K.1t([P[0],P[1],(P[2]||0)]),7.U)}},1Z:l(a,b){a=v.u(a);b=v.u(b);o(a.4.q==2){a.4.19(0)}o(b.4.q==2){b.4.19(0)}o(a.4.q>3||b.4.q>3){8 w}9 c=b.1u();o(c===0){8 w}7.K=a;7.U=v.u([b.4[0]/c,b.4[1]/c,b.4[2]/c]);8 7}};14.u=l(a,b){9 L=25 14();8 L.1Z(a,b)};14.X=14.u(v.1j(3),v.i);14.Y=14.u(v.1j(3),v.j);14.Z=14.u(v.1j(3),v.k);l 11(){}11.23={24:l(a){8(7.1h(a.K)&&7.1m(a))},1q:l(){8 11.u(7.K,7.W)},2U:l(a){9 V=a.4||a;8 11.u([7.K.4[0]+V[0],7.K.4[1]+V[1],7.K.4[2]+(V[2]||0)],7.W)},1m:l(a){9 b;o(a.W){b=7.W.1C(a.W);8(F.13(b)<=17.16||F.13(F.1A-b)<=17.16)}1d o(a.U){8 7.W.2k(a.U)}8 w},2k:l(a){9 b=7.W.1C(a.W);8(F.13(F.1A/2-b)<=17.16)},1o:l(a){o(7.1v(a)||7.1h(a)){8 0}o(a.K){9 A=7.K.4,B=a.K.4,N=7.W.4;8 F.13((A[0]-B[0])*N[0]+(A[1]-B[1])*N[1]+(A[2]-B[2])*N[2])}1d{9 P=a.4||a;9 A=7.K.4,N=7.W.4;8 F.13((A[0]-P[0])*N[0]+(A[1]-P[1])*N[1]+(A[2]-(P[2]||0))*N[2])}},1h:l(a){o(a.W){8 w}o(a.U){8(7.1h(a.K)&&7.1h(a.K.2j(a.U)))}1d{9 P=a.4||a;9 A=7.K.4,N=7.W.4;9 b=F.13(N[0]*(A[0]-P[0])+N[1]*(A[1]-P[1])+N[2]*(A[2]-(P[2]||0)));8(b<=17.16)}},1v:l(a){o(1g(a.U)==\'1f\'&&1g(a.W)==\'1f\'){8 w}8!7.1m(a)},1U:l(a){o(!7.1v(a)){8 w}o(a.U){9 A=a.K.4,D=a.U.4,P=7.K.4,N=7.W.4;9 b=(N[0]*(P[0]-A[0])+N[1]*(P[1]-A[1])+N[2]*(P[2]-A[2]))/(N[0]*D[0]+N[1]*D[1]+N[2]*D[2]);8 v.u([A[0]+D[0]*b,A[1]+D[1]*b,A[2]+D[2]*b])}1d o(a.W){9 c=7.W.2f(a.W).2q();9 N=7.W.4,A=7.K.4,O=a.W.4,B=a.K.4;9 d=S.1j(2,2),i=0;H(d.2y()){i++;d=S.u([[N[i%3],N[(i+1)%3]],[O[i%3],O[(i+1)%3]]])}9 e=d.2w().4;9 x=N[0]*A[0]+N[1]*A[1]+N[2]*A[2];9 y=O[0]*B[0]+O[1]*B[1]+O[2]*B[2];9 f=[e[0][0]*x+e[0][1]*y,e[1][0]*x+e[1][1]*y];9 g=[];2e(9 j=1;j<=3;j++){g.19((i==j)?0:f[(j+(5-i)%3)%3])}8 14.u(g,c)}},1r:l(a){9 P=a.4||a;9 A=7.K.4,N=7.W.4;9 b=(A[0]-P[0])*N[0]+(A[1]-P[1])*N[1]+(A[2]-(P[2]||0))*N[2];8 v.u([P[0]+N[0]*b,P[1]+N[1]*b,(P[2]||0)+N[2]*b])},1V:l(t,a){9 R=S.1R(t,a.U).4;9 C=a.1r(7.K).4;9 A=7.K.4,N=7.W.4;9 b=C[0],1E=C[1],1J=C[2],1w=A[0],18=A[1],1a=A[2];9 x=1w-b,y=18-1E,z=1a-1J;8 11.u([b+R[0][0]*x+R[0][1]*y+R[0][2]*z,1E+R[1][0]*x+R[1][1]*y+R[1][2]*z,1J+R[2][0]*x+R[2][1]*y+R[2][2]*z],[R[0][0]*N[0]+R[0][1]*N[1]+R[0][2]*N[2],R[1][0]*N[0]+R[1][1]*N[1]+R[1][2]*N[2],R[2][0]*N[0]+R[2][1]*N[1]+R[2][2]*N[2]])},1t:l(a){o(a.W){9 A=7.K.4,N=7.W.4;9 b=A[0],18=A[1],1a=A[2],2M=N[0],2L=N[1],2Q=N[2];9 c=7.K.1t(a).4;9 d=b+2M,2p=18+2L,2m=1a+2Q;9 Q=a.1r([d,2p,2m]).4;9 e=[Q[0]+(Q[0]-d)-c[0],Q[1]+(Q[1]-2p)-c[1],Q[2]+(Q[2]-2m)-c[2]];8 11.u(c,e)}1d o(a.U){8 7.1V(F.1A,a)}1d{9 P=a.4||a;8 11.u(7.K.1t([P[0],P[1],(P[2]||0)]),7.W)}},1Z:l(a,b,c){a=v.u(a);a=a.1N();o(a===w){8 w}b=v.u(b);b=b.1N();o(b===w){8 w}o(1g(c)==\'1f\'){c=w}1d{c=v.u(c);c=c.1N();o(c===w){8 w}}9 d=a.4[0],18=a.4[1],1a=a.4[2];9 e=b.4[0],1W=b.4[1],1X=b.4[2];9 f,1i;o(c!==w){9 g=c.4[0],2l=c.4[1],2t=c.4[2];f=v.u([(1W-18)*(2t-1a)-(1X-1a)*(2l-18),(1X-1a)*(g-d)-(e-d)*(2t-1a),(e-d)*(2l-18)-(1W-18)*(g-d)]);1i=f.1u();o(1i===0){8 w}f=v.u([f.4[0]/1i,f.4[1]/1i,f.4[2]/1i])}1d{1i=F.1x(e*e+1W*1W+1X*1X);o(1i===0){8 w}f=v.u([b.4[0]/1i,b.4[1]/1i,b.4[2]/1i])}7.K=a;7.W=f;8 7}};11.u=l(a,b,c){9 P=25 11();8 P.1Z(a,b,c)};11.2I=11.u(v.1j(3),v.k);11.2H=11.u(v.1j(3),v.i);11.2G=11.u(v.1j(3),v.j);11.36=11.2I;11.35=11.2H;11.3j=11.2G;9 $V=v.u;9 $M=S.u;9 $L=14.u;9 $P=11.u;',62,206,'||||elements|||this|return|var||||||||||||function|||if||length||||create|Vector|null|||||||||Math|nj|while||do|anchor||||||||Matrix||direction||normal||||kj|Plane|ni|abs|Line|ki|precision|Sylvester|A2|push|A3|map|els|else||undefined|typeof|contains|mod|Zero|D3|D2|isParallelTo|kp|distanceFrom|cols|dup|pointClosestTo|np|reflectionIn|modulus|intersects|A1|sqrt|isSquare|X2|PI|X3|angleFrom|mod1|C2|mod2|sin|cos|break|C3|toRightTriangular|false|Y3|to3D|E2|E1|E3|Rotation|Y2|Y1|intersectionWith|rotate|v12|v13|rank|setVectors|nc|sum|multiply|prototype|eql|new|setElements|case|each|PA3|PA2|part|new_element|round|for|cross|product|AD2|isSameSizeAs|add|isPerpendicularTo|v22|AN3|inspect|AD3|AN2|toUnitVector|PsubQ3|PsubQ2|v23|dot|divisor|inverse|true|isSingular|determinant|max|canMultiplyFromLeft|subtract|rows|col|random|ZX|YZ|XY|Random|join|N2|N1|D1|slice|default|N3|dimensions|switch|liesIn|translate|snapTo|augment|Diagonal|trace|indexOf|diagonal|transpose|minor|row|isAntiparallelTo|ZY|YX|acos|RotationZ|RotationY|liesOn|RotationX|inv|rk|tr|det|toDiagonalMatrix|toUpperTriangular|version|XZ'.split('|'),0,{}))
}

// Inner glUtils.js
{
	// augment Sylvester some
	Matrix.Translation = function (v)
	{
	  if (v.elements.length == 2) {
		var r = Matrix.I(3);
		r.elements[2][0] = v.elements[0];
		r.elements[2][1] = v.elements[1];
		return r;
	  }

	  if (v.elements.length == 3) {
		var r = Matrix.I(4);
		r.elements[0][3] = v.elements[0];
		r.elements[1][3] = v.elements[1];
		r.elements[2][3] = v.elements[2];
		return r;
	  }

	  throw "Invalid length for Translation";
	}

	Matrix.Translation4x4 = function (tx, ty, tz)
	{
		var m = Matrix.I(4);
		m.elements[0][3] = tx;
		m.elements[1][3] = ty;
		m.elements[2][3] = tz;

		return m;
	}

	Matrix.prototype.flatten = function ()
	{
		var result = [];
		if (this.elements.length == 0)
			return [];


		for (var j = 0; j < this.elements[0].length; j++)
			for (var i = 0; i < this.elements.length; i++)
				result.push(this.elements[i][j]);
		return result;
	}

	Matrix.prototype.ensure4x4 = function()
	{
		if (this.elements.length == 4 &&
			this.elements[0].length == 4)
			return this;

		if (this.elements.length > 4 ||
			this.elements[0].length > 4)
			return null;

		for (var i = 0; i < this.elements.length; i++) {
			for (var j = this.elements[i].length; j < 4; j++) {
				if (i == j)
					this.elements[i].push(1);
				else
					this.elements[i].push(0);
			}
		}

		for (var i = this.elements.length; i < 4; i++) {
			if (i == 0)
				this.elements.push([1, 0, 0, 0]);
			else if (i == 1)
				this.elements.push([0, 1, 0, 0]);
			else if (i == 2)
				this.elements.push([0, 0, 1, 0]);
			else if (i == 3)
				this.elements.push([0, 0, 0, 1]);
		}

		return this;
	};

	Matrix.prototype.make3x3 = function()
	{
		if (this.elements.length != 4 ||
			this.elements[0].length != 4)
			return null;

		return Matrix.create([[this.elements[0][0], this.elements[0][1], this.elements[0][2]],
							  [this.elements[1][0], this.elements[1][1], this.elements[1][2]],
							  [this.elements[2][0], this.elements[2][1], this.elements[2][2]]]);
	};

	Vector.prototype.flatten = function ()
	{
		return this.elements;
	};

	function mht(m) {
		var s = "";
		if (m.length == 16) {
			for (var i = 0; i < 4; i++) {
				s += "<span style='font-family: monospace'>[" + m[i*4+0].toFixed(4) + "," + m[i*4+1].toFixed(4) + "," + m[i*4+2].toFixed(4) + "," + m[i*4+3].toFixed(4) + "]</span><br>";
			}
		} else if (m.length == 9) {
			for (var i = 0; i < 3; i++) {
				s += "<span style='font-family: monospace'>[" + m[i*3+0].toFixed(4) + "," + m[i*3+1].toFixed(4) + "," + m[i*3+2].toFixed(4) + "]</font><br>";
			}
		} else {
			return m.toString();
		}
		return s;
	}

	//
	// gluLookAt
	//
	function makeLookAt(ex, ey, ez,
						cx, cy, cz,
						ux, uy, uz)
	{
		var eye = $V([ex, ey, ez]);
		var center = $V([cx, cy, cz]);
		var up = $V([ux, uy, uz]);

		var mag;

		var z = eye.subtract(center).toUnitVector();
		var x = up.cross(z).toUnitVector();
		var y = z.cross(x).toUnitVector();

		var m = $M([[x.e(1), x.e(2), x.e(3), 0],
					[y.e(1), y.e(2), y.e(3), 0],
					[z.e(1), z.e(2), z.e(3), 0],
					[0, 0, 0, 1]]);

		var t = $M([[1, 0, 0, -ex],
					[0, 1, 0, -ey],
					[0, 0, 1, -ez],
					[0, 0, 0, 1]]);
		return m.x(t);
	}

	//
	// gluPerspective
	//
	function makePerspective(fovy, aspect, znear, zfar)
	{
		var ymax = znear * Math.tan(fovy * Math.PI / 360.0);
		var ymin = -ymax;
		var xmin = ymin * aspect;
		var xmax = ymax * aspect;

		return makeFrustum(xmin, xmax, ymin, ymax, znear, zfar);
	}

	//
	// glFrustum
	//
	function makeFrustum(left, right,
						 bottom, top,
						 znear, zfar)
	{
		var X = 2*znear/(right-left);
		var Y = 2*znear/(top-bottom);
		var A = (right+left)/(right-left);
		var B = (top+bottom)/(top-bottom);
		var C = -(zfar+znear)/(zfar-znear);
		var D = -2*zfar*znear/(zfar-znear);

		return $M([[X, 0, A, 0],
				   [0, Y, B, 0],
				   [0, 0, C, D],
				   [0, 0, -1, 0]]);
	}

	//
	// glOrtho
	//
	function makeOrtho(left, right, bottom, top, znear, zfar)
	{
		var tx = - (right + left) / (right - left);
		var ty = - (top + bottom) / (top - bottom);
		var tz = - (zfar + znear) / (zfar - znear);

		return $M([[2 / (right - left), 0, 0, tx],
			   [0, 2 / (top - bottom), 0, ty],
			   [0, 0, -2 / (zfar - znear), tz],
			   [0, 0, 0, 1]]);
	}
}

// Customize Sylvester
Matrix.prototype.translate = function(x, y, z){
	x = x || 0;
	y = y || 0;
	z = z || 0;
	
	if(x === 0 && y === 0 && z === 0){
		return;
	}
	
	this.elements = Matrix.Translation($V([x, y, z])).ensure4x4().x(this).elements;
}

Matrix.prototype.rotate = function(angle, x, y, z){
	angle = angle || 0;
	angle = angle * Math.PI / 180; // To radians
	x = x || 0;
	y = y || 0;
	z = z || 0;
	
	if(angle === 0 || (x === 0 && y === 0 && z === 0)){
		return;
	}
	
	this.elements = Matrix.Rotation(angle, $V([x, y, z])).ensure4x4().x(this).elements;
}

Matrix.prototype.rotateXYZ = function(x, y, z){
	this.rotate(x, 1, 0, 0);
	this.rotate(y, 0, 1, 0);
	this.rotate(z, 0, 0, 1);
}

Matrix.prototype.scale = function(x, y, z){
	x = x || 1;
	y = y || 1;
	z = z || 1;
	
	if(x === 1 && y === 1 && z === 1){
		return;
	}
	
	this.elements = $M([
						[x, 0, 0, 0],
						[0, y, 0, 0],
						[0, 0, z, 0],
						[0, 0, 0, 1]
					]).ensure4x4().x(this).elements;
}

// NGL
function NGL(canvas){
	this.canvas = canvas;
	this.gl = null;

	this.lastUpdate = Date.now();
	this.delta = 0.0;
	
	this.frameCount = 0;
	this.lastFPSUpdate = 0;
	this.fps = 0;

	this.controls = {
		keys: []
	};
	this.eventPool = {
		down: {},
		up: {},
		mouse: {
			down: [],
			up: [],
			movement: {x: 0, y: 0}
		}
	};
	this.programs = {};
	this.clearColor = [0, 0, 0, 1];
	
	this.onready = function(){};
	
	this.scenes = [];
	
	if(this.canvas){
		
		
		this.canvas.requestPointerLock = 	this.canvas.requestPointerLock ||
											this.canvas.mozRequestPointerLock ||
											this.canvas.webkitRequestPointerLock ||
											function(){
												console.log("Can't request pointer lock: Function not found");
											};
		
		this.canvas.requestFullScreen =	this.canvas.requestFullScreen ||
										this.canvas.mozRequestFullScreen ||
										this.canvas.webkitRequestFullScreen ||
										this.canvas.webkitRequestFullscreen ||
										function(){
											console.log("Can't request fullscreen: Function not found");
										};
		
		document.cancelFullScreen =	document.cancelFullScreen ||
									document.mozCancelFullScreen ||
									document.webkitCancelFullScreen ||
									function(){
										console.log("Can't cancel fullscreen: Function not found");
									};
		
		document.exitPointerLock = 	document.exitPointerLock    ||
									document.mozExitPointerLock ||
									document.webkitExitPointerLock ||
									function(){
										console.log("Can't exit pointer lock: Function not found");
									};
		
		this.gl = this.canvas.getContext("webgl") || this.canvas.getContext("experimental-webgl");
	}else{
		throw new Error(canvas+" isn't a valid <canvas> element.");
	}
	
	this.gl.enable(this.gl.DEPTH_TEST);
	this.gl.enable(this.gl.CULL_FACE);
	this.gl.enable(this.gl.BLEND);
	this.gl.depthFunc(this.gl.LEQUAL);
	this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
}

// Methods
NGL.prototype.renderMeshObject = function(obj, sce, pv, pvFixed){
	var shaderProgram = this.programs.material;
	if(obj.font){
		shaderProgram = this.programs.font;
	}else if(obj.material){
		shaderProgram = this.programs[obj.material.shaderProgram];
	}

	this.gl.useProgram(shaderProgram);

	if(obj.verticesBuffer && shaderProgram.attributes.hasOwnProperty("vertexPosition")){
		this.gl.enableVertexAttribArray(shaderProgram.attributes.vertexPosition);
	}
	if(obj.colorsBuffer && shaderProgram.attributes.hasOwnProperty("vertexColor")){
		this.gl.enableVertexAttribArray(shaderProgram.attributes.vertexColor);
	}
	if(obj.textureCoordsBuffer && shaderProgram.attributes.hasOwnProperty("vertexTextureCoords")){
		this.gl.enableVertexAttribArray(shaderProgram.attributes.vertexTextureCoords);
	}
	if(obj.normalsBuffer && shaderProgram.attributes.hasOwnProperty("vertexNormal")){
		this.gl.enableVertexAttribArray(shaderProgram.attributes.vertexNormal);
	}

	var model = Matrix.I(4);
	model.scale(obj.scale.x, obj.scale.y, obj.scale.z);
	model.rotateXYZ(obj.rotation.x, obj.rotation.y, obj.rotation.z);
	model.translate(obj.position.x, obj.position.y, obj.position.z);

	if(obj.verticesBuffer && shaderProgram.attributes.hasOwnProperty("vertexPosition")){
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, obj.verticesBuffer);
		this.gl.vertexAttribPointer(shaderProgram.attributes.vertexPosition, 3, this.gl.FLOAT, false, 0, 0);
	}
	
	if(obj.colorsBuffer && shaderProgram.attributes.hasOwnProperty("vertexColor")){
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, obj.colorsBuffer);
		this.gl.vertexAttribPointer(shaderProgram.attributes.vertexColor, 4, this.gl.FLOAT, false, 0, 0);
	}

	if(obj.textureCoordsBuffer && shaderProgram.attributes.hasOwnProperty("vertexTextureCoords")){
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, obj.textureCoordsBuffer);
		this.gl.vertexAttribPointer(shaderProgram.attributes.vertexTextureCoords, 2, this.gl.FLOAT, false, 0, 0);
	}

	if(obj.normalsBuffer && shaderProgram.attributes.hasOwnProperty("vertexNormal")){
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, obj.normalsBuffer);
		this.gl.vertexAttribPointer(shaderProgram.attributes.vertexNormal, 3, this.gl.FLOAT, false, 0, 0);
	}

	// Set uniforms
	if(shaderProgram.uniforms.hasOwnProperty("diffuseTexture")){
		if(obj.material && obj.material.texture){
			if(shaderProgram.uniforms.hasOwnProperty("hasDiffuseTexture")){
				this.gl.uniform1f(shaderProgram.uniforms.hasDiffuseTexture, 1);
			}
			this.gl.activeTexture(this.gl.TEXTURE0)
			this.gl.bindTexture(this.gl.TEXTURE_2D, obj.material.texture);
			this.gl.uniform1i(shaderProgram.uniforms.diffuseTexture, 0);
		}else if(shaderProgram.uniforms.hasOwnProperty("hasDiffuseTexture")){
			this.gl.uniform1f(shaderProgram.uniforms.hasDiffuseTexture, 0);
		}
	}

	if(shaderProgram.uniforms.hasOwnProperty("normalTexture")){
		if(obj.material && obj.material.normalTexture){
			if(shaderProgram.uniforms.hasOwnProperty("hasNormalTexture")){
				this.gl.uniform1f(shaderProgram.uniforms.hasNormalTexture, 1);
			}
			this.gl.activeTexture(this.gl.TEXTURE1)
			this.gl.bindTexture(this.gl.TEXTURE_2D, obj.material.normalTexture);
			this.gl.uniform1i(shaderProgram.uniforms.normalTexture, 1);
		}else if(shaderProgram.uniforms.hasOwnProperty("hasNormalTexture")){
			this.gl.uniform1f(shaderProgram.uniforms.hasNormalTexture, 0);
		}
	}

	if(shaderProgram.uniforms.hasOwnProperty("specularTexture")){
		if(obj.material && obj.material.specularTexture){
			if(shaderProgram.uniforms.hasOwnProperty("hasSpecularTexture")){
				this.gl.uniform1f(shaderProgram.uniforms.hasSpecularTexture, 1);
			}
			this.gl.activeTexture(this.gl.TEXTURE2)
			this.gl.bindTexture(this.gl.TEXTURE_2D, obj.material.specularTexture);
			this.gl.uniform1i(shaderProgram.uniforms.specularTexture, 2);
		}else if(shaderProgram.uniforms.hasOwnProperty("hasSpecularTexture")){
			this.gl.uniform1f(shaderProgram.uniforms.hasSpecularTexture, 0);
		}
	}

	if(shaderProgram.uniforms.hasOwnProperty("skybox")){
		if(obj.material && sce.skybox){
			if(shaderProgram.uniforms.hasOwnProperty("hasSkybox")){
				this.gl.uniform1f(shaderProgram.uniforms.hasSkybox, 1);
			}
			this.gl.activeTexture(this.gl.TEXTURE3)
			this.gl.bindTexture(this.gl.TEXTURE_CUBE_MAP, sce.skybox.cubemap);
			this.gl.uniform1i(shaderProgram.uniforms.skybox, 3);
		}else if(shaderProgram.uniforms.hasOwnProperty("hasSkybox")){
			this.gl.uniform1f(shaderProgram.uniforms.hasSkybox, 0);
		}
	}

	if(shaderProgram.uniforms.hasOwnProperty("pvm")){
		this.gl.uniformMatrix4fv(shaderProgram.uniforms.pvm, false, new Float32Array(pv.x(model).flatten()));
	}

	if(shaderProgram.uniforms.hasOwnProperty("normalMatrix")){
		var normalMatrix = model.inv();
		normalMatrix = normalMatrix.transpose();
		this.gl.uniformMatrix4fv(shaderProgram.uniforms.normalMatrix, false, new Float32Array(normalMatrix.flatten()));
	}

	if(shaderProgram.uniforms.hasOwnProperty("lightDirection")){
		var sunDir = $V([sce.sunDir.x, sce.sunDir.y, sce.sunDir.z]).toUnitVector(); // Sun direction (TEMP, TODO)
		this.gl.uniform3fv(shaderProgram.uniforms.lightDirection, new Float32Array(sunDir.flatten()));
	}

	if(shaderProgram.uniforms.hasOwnProperty("cameraPosition")){
		var camPos = $V([0, 0, 0]);

		if(sce.activeCamera){
			var worldPos = sce.activeCamera.getWorldPosition();
			camPos.elements[0] = worldPos.x;
			camPos.elements[1] = worldPos.y;
			camPos.elements[2] = worldPos.z;
		}

		this.gl.uniform3fv(shaderProgram.uniforms.cameraPosition, new Float32Array(camPos.flatten()));
	}

	if(shaderProgram.uniforms.hasOwnProperty("hardness")){
		if(obj.material){
			this.gl.uniform1f(shaderProgram.uniforms.hardness, obj.material.hardness);
		}
	}

	if(shaderProgram.uniforms.hasOwnProperty("shiness")){
		if(obj.material){
			this.gl.uniform1f(shaderProgram.uniforms.shiness, obj.material.shiness);
		}else{
			this.gl.uniform1f(shaderProgram.uniforms.shiness, 0);
		}
	}

	if(shaderProgram.uniforms.hasOwnProperty("reflectivity")){
		if(obj.material){
			this.gl.uniform1f(shaderProgram.uniforms.reflectivity, obj.material.reflectivity);
		}else{
			this.gl.uniform1f(shaderProgram.uniforms.reflectivity, 0);
		}
	}

	if(shaderProgram.uniforms.hasOwnProperty("color")){
		if(obj.material && obj.material.color){
			this.gl.uniform4fv(shaderProgram.uniforms.color, new Float32Array(obj.material.color));
		}
		if(obj.color){
			this.gl.uniform4fv(shaderProgram.uniforms.color, new Float32Array(obj.color));
		}
	}

	// Render
	if(obj.wire){
		this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, obj.wireIndicesBuffer);
		this.gl.drawElements(this.gl.LINES, obj.wireSize, this.gl.UNSIGNED_SHORT, 0);
	}else{
		this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, obj.indicesBuffer);
		this.gl.drawElements(this.gl[obj.drawMode], obj.size, this.gl.UNSIGNED_SHORT, 0);
	}

	this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, null);
	this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);
	this.gl.bindTexture(this.gl.TEXTURE_2D, null);

	if(obj.normalsBuffer && shaderProgram.attributes.hasOwnProperty("vertexNormal")){
		this.gl.disableVertexAttribArray(shaderProgram.attributes.vertexNormal);
	}
	if(obj.textureCoordsBuffer && shaderProgram.attributes.hasOwnProperty("vertexTextureCoords")){
		this.gl.disableVertexAttribArray(shaderProgram.attributes.vertexTextureCoords);
	}
	if(obj.colorsBuffer && shaderProgram.attributes.hasOwnProperty("vertexColor")){
		this.gl.disableVertexAttribArray(shaderProgram.attributes.vertexColor);
	}
	if(obj.verticesBuffer && shaderProgram.attributes.hasOwnProperty("vertexPosition")){
		this.gl.disableVertexAttribArray(shaderProgram.attributes.vertexPosition);
	}
}

NGL.prototype.renderTextObject = function(obj, sce, pv, pvFixed){
	var shaderProgram = this.programs.material;
	if(obj.font){
		shaderProgram = this.programs.font;
	}else if(obj.material){
		shaderProgram = this.programs[obj.material.shaderProgram];
	}

	this.gl.useProgram(shaderProgram);

	if(obj.verticesBuffer && shaderProgram.attributes.hasOwnProperty("vertexPosition")){
		this.gl.enableVertexAttribArray(shaderProgram.attributes.vertexPosition);
	}
	if(obj.colorsBuffer && shaderProgram.attributes.hasOwnProperty("vertexColor")){
		this.gl.enableVertexAttribArray(shaderProgram.attributes.vertexColor);
	}
	if(obj.textureCoordsBuffer && shaderProgram.attributes.hasOwnProperty("vertexTextureCoords")){
		this.gl.enableVertexAttribArray(shaderProgram.attributes.vertexTextureCoords);
	}

	var model = Matrix.I(4);
	model.scale(obj.scale.x, obj.scale.y, obj.scale.z);
	model.rotateXYZ(obj.rotation.x, obj.rotation.y, obj.rotation.z);
	model.translate(obj.position.x, obj.position.y, obj.position.z);

	if(obj.verticesBuffer && shaderProgram.attributes.hasOwnProperty("vertexPosition")){
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, obj.verticesBuffer);
		this.gl.vertexAttribPointer(shaderProgram.attributes.vertexPosition, 3, this.gl.FLOAT, false, 0, 0);
	}

	if(obj.textureCoordsBuffer && shaderProgram.attributes.hasOwnProperty("vertexTextureCoords")){
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, obj.textureCoordsBuffer);
		this.gl.vertexAttribPointer(shaderProgram.attributes.vertexTextureCoords, 2, this.gl.FLOAT, false, 0, 0);
	}

	if(obj.colorsBuffer && shaderProgram.attributes.hasOwnProperty("vertexColor")){
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, obj.colorsBuffer);
		this.gl.vertexAttribPointer(shaderProgram.attributes.vertexColor, 4, this.gl.FLOAT, false, 0, 0);
	}

	// Set uniforms
	if(shaderProgram.uniforms.hasOwnProperty("fontTexture")){
		if(obj.font && obj.font.pages[0]){
			if(shaderProgram.uniforms.hasOwnProperty("hasFontTexture")){
				this.gl.uniform1f(shaderProgram.uniforms.hasFontTexture, 1);
			}
			this.gl.activeTexture(this.gl.TEXTURE4)
			this.gl.bindTexture(this.gl.TEXTURE_2D, obj.font.pages[0]);
			this.gl.uniform1i(shaderProgram.uniforms.fontTexture, 4);
		}else if(shaderProgram.uniforms.hasOwnProperty("hasFontTexture")){
			this.gl.uniform1f(shaderProgram.uniforms.hasFontTexture, 0);
		}
	}

	if(shaderProgram.uniforms.hasOwnProperty("pvm")){
		this.gl.uniformMatrix4fv(shaderProgram.uniforms.pvm, false, new Float32Array(pv.x(model).flatten()));
	}

	if(shaderProgram.uniforms.hasOwnProperty("color")){
		if(obj.material && obj.material.color){
			this.gl.uniform4fv(shaderProgram.uniforms.color, new Float32Array(obj.material.color));
		}
		if(obj.color){
			this.gl.uniform4fv(shaderProgram.uniforms.color, new Float32Array(obj.color));
		}
	}

	if(shaderProgram.uniforms.hasOwnProperty("charWidth")){
		if(obj.font){
			this.gl.uniform1f(shaderProgram.uniforms.charWidth, obj.font.charWidth);
		}
	}

	if(shaderProgram.uniforms.hasOwnProperty("glowness")){
		if(obj.font){
			this.gl.uniform1f(shaderProgram.uniforms.glowness, obj.font.glowness);
		}
	}

	// Render
	this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, obj.indicesBuffer);
	this.gl.drawElements(this.gl[obj.drawMode], obj.size, this.gl.UNSIGNED_SHORT, 0);

	this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, null);
	this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);
	this.gl.bindTexture(this.gl.TEXTURE_2D, null);

	if(obj.normalsBuffer && shaderProgram.attributes.hasOwnProperty("vertexNormal")){
		this.gl.disableVertexAttribArray(shaderProgram.attributes.vertexNormal);
	}
	if(obj.textureCoordsBuffer && shaderProgram.attributes.hasOwnProperty("vertexTextureCoords")){
		this.gl.disableVertexAttribArray(shaderProgram.attributes.vertexTextureCoords);
	}
	if(obj.colorsBuffer && shaderProgram.attributes.hasOwnProperty("vertexColor")){
		this.gl.disableVertexAttribArray(shaderProgram.attributes.vertexColor);
	}
	if(obj.verticesBuffer && shaderProgram.attributes.hasOwnProperty("vertexPosition")){
		this.gl.disableVertexAttribArray(shaderProgram.attributes.vertexPosition);
	}
}

NGL.prototype.renderTerrain = function(obj, sce, pv, pvFixed){
	var shaderProgram = this.programs.terrain;

	this.gl.useProgram(shaderProgram);
	
	if(obj.backface){
		this.gl.disable(this.gl.CULL_FACE);
	}

	if(obj.verticesBuffer && shaderProgram.attributes.hasOwnProperty("vertexPosition")){
		this.gl.enableVertexAttribArray(shaderProgram.attributes.vertexPosition);
	}
	if(obj.textureCoordsBuffer && shaderProgram.attributes.hasOwnProperty("vertexTextureCoords")){
		this.gl.enableVertexAttribArray(shaderProgram.attributes.vertexTextureCoords);
	}
	if(obj.normalsBuffer && shaderProgram.attributes.hasOwnProperty("vertexNormal")){
		this.gl.enableVertexAttribArray(shaderProgram.attributes.vertexNormal);
	}

	var model = Matrix.I(4);
	model.scale(obj.scale.x, obj.scale.y, obj.scale.z);
	model.rotateXYZ(obj.rotation.x, obj.rotation.y, obj.rotation.z);
	model.translate(obj.position.x, obj.position.y, obj.position.z);

	if(obj.verticesBuffer && shaderProgram.attributes.hasOwnProperty("vertexPosition")){
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, obj.verticesBuffer);
		this.gl.vertexAttribPointer(shaderProgram.attributes.vertexPosition, 3, this.gl.FLOAT, false, 0, 0);
	}

	if(obj.textureCoordsBuffer && shaderProgram.attributes.hasOwnProperty("vertexTextureCoords")){
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, obj.textureCoordsBuffer);
		this.gl.vertexAttribPointer(shaderProgram.attributes.vertexTextureCoords, 2, this.gl.FLOAT, false, 0, 0);
	}

	if(obj.normalsBuffer && shaderProgram.attributes.hasOwnProperty("vertexNormal")){
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, obj.normalsBuffer);
		this.gl.vertexAttribPointer(shaderProgram.attributes.vertexNormal, 3, this.gl.FLOAT, false, 0, 0);
	}

	// Set uniforms
	if(shaderProgram.uniforms.hasOwnProperty("pvm")){
		this.gl.uniformMatrix4fv(shaderProgram.uniforms.pvm, false, new Float32Array(pv.x(model).flatten()));
	}

	if(shaderProgram.uniforms.hasOwnProperty("normalMatrix")){
		var normalMatrix = model.inv();
		normalMatrix = normalMatrix.transpose();
		this.gl.uniformMatrix4fv(shaderProgram.uniforms.normalMatrix, false, new Float32Array(normalMatrix.flatten()));
	}

	if(shaderProgram.uniforms.hasOwnProperty("lightDirection")){
		var sunDir = $V([sce.sunDir.x, sce.sunDir.y, sce.sunDir.z]).toUnitVector(); // Sun direction (TEMP, TODO)
		this.gl.uniform3fv(shaderProgram.uniforms.lightDirection, new Float32Array(sunDir.flatten()));
	}

	if(shaderProgram.uniforms.hasOwnProperty("color")){
		if(obj.color){
			this.gl.uniform4fv(shaderProgram.uniforms.color, new Float32Array(obj.color));
		}
	}

	// Render
	if(obj.wire){
		this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, obj.wireIndicesBuffer);
		this.gl.drawElements(this.gl.LINES, obj.wireSize, this.gl.UNSIGNED_SHORT, 0);
	}else{
		this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, obj.indicesBuffer);
		this.gl.drawElements(this.gl.TRIANGLES, obj.size, this.gl.UNSIGNED_SHORT, 0);
	}
	
	this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, null);
	this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);
	this.gl.bindTexture(this.gl.TEXTURE_2D, null);
	
	if(obj.backface){
		this.gl.enable(this.gl.CULL_FACE);
	}

	if(obj.normalsBuffer && shaderProgram.attributes.hasOwnProperty("vertexNormal")){
		this.gl.disableVertexAttribArray(shaderProgram.attributes.vertexNormal);
	}
	if(obj.textureCoordsBuffer && shaderProgram.attributes.hasOwnProperty("vertexTextureCoords")){
		this.gl.disableVertexAttribArray(shaderProgram.attributes.vertexTextureCoords);
	}
	if(obj.verticesBuffer && shaderProgram.attributes.hasOwnProperty("vertexPosition")){
		this.gl.disableVertexAttribArray(shaderProgram.attributes.vertexPosition);
	}
}

NGL.prototype.render = function(){
	this.gl.clearColor(this.clearColor[0], this.clearColor[1], this.clearColor[2], this.clearColor[3]);
	this.gl.clear(this.gl.COLOR_BUFFER_BIT);
	
	for(var i = this.scenes.length-1; i >= 0; i--){
		this.gl.clear(this.gl.DEPTH_BUFFER_BIT);
		
		var sce = this.scenes[i];
		
		var pv = Matrix.I(4);
		var pvFixed = Matrix.I(4);
		if(sce.activeCamera){
			pv = sce.activeCamera.toMatrix(this.canvas.width, this.canvas.height);
			
			pvFixed = sce.activeCamera.toSkyboxMatrix(this.canvas.width, this.canvas.height).x(pvFixed);
		}
		
		if(sce.skybox){
			this.gl.disable(this.gl.CULL_FACE);
			this.gl.depthMask(false);

			this.gl.useProgram(this.programs.skybox);

			this.gl.enableVertexAttribArray(this.programs.skybox.attributes.vertexPosition);

			this.gl.bindBuffer(this.gl.ARRAY_BUFFER, sce.skybox.verticesBuffer);
			this.gl.vertexAttribPointer(this.programs.skybox.attributes.vertexPosition, 3, this.gl.FLOAT, false, 0, 0);

			this.gl.activeTexture(this.gl.TEXTURE0);
			this.gl.bindTexture(this.gl.TEXTURE_CUBE_MAP, sce.skybox.cubemap);
			this.gl.uniform1i(this.programs.skybox.uniforms.cubemap, 0);

			var sunDir = $V([sce.sunDir.x, sce.sunDir.y, sce.sunDir.z]).toUnitVector(); // Sun direction (TEMP, TODO)
			this.gl.uniform3fv(this.programs.skybox.uniforms.lightDirection, new Float32Array(sunDir.flatten()));

			this.gl.uniform4fv(this.programs.skybox.uniforms.skycolor, new Float32Array(sce.skybox.color));

			this.gl.uniformMatrix4fv(this.programs.skybox.uniforms.pvFixed, false, new Float32Array(pvFixed.flatten()));

			this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, sce.skybox.indicesBuffer);
			this.gl.drawElements(this.gl.TRIANGLES, sce.skybox.indices.length, this.gl.UNSIGNED_SHORT, 0);

			this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, null);
			this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);
			this.gl.bindTexture(this.gl.TEXTURE_CUBE_MAP, null);

			this.gl.disableVertexAttribArray(this.programs.skybox.attributes.vertexPosition);

			this.gl.useProgram(null);

			this.gl.depthMask(true);
			this.gl.enable(this.gl.CULL_FACE);
		}
		
		for(var x in sce.objects){
			var obj = sce.objects[x];
			
			if(obj.visible){
				if(obj.objectType === NGL.objectTypes.MESHOBJECT){
					// Render mesh object
					this.renderMeshObject(obj, sce, pv, pvFixed);
				}else if(obj.objectType === NGL.objectTypes.TEXTOBJECT){
					// Render text
					this.renderTextObject(obj, sce, pv, pvFixed);
				}else if(obj.objectType === NGL.objectTypes.TERRAIN){
					// Render terrain
					this.renderTerrain(obj, sce, pv, pvFixed);
				}
			}
		}
		this.gl.useProgram(null);
	}
}

NGL.prototype.createCamera = function(){
	return {
		objectType: NGL.objectTypes.CAMERA,
		
		position: {x: 0, y: 0, z: 0},
		rotation: {x: 0, y: 0, z: 0},
		
		perspective: true,
		orthoSize: 1,
		
		fov: 70,
		near: 0.1,
		far: 1000,
		
		toMatrix: function(width, height){
			var proj = Matrix.I(4);
			if(this.perspective){
				proj = makePerspective(this.fov, width/height, this.near, this.far);
			}else{
				proj = makeOrtho(0.5, (width/height)*this.orthoSize, 0.5, (width/height)*this.orthoSize, this.near, this.far);
			}
			
			var view = Matrix.I(4);
			
			view.translate(-this.position.x, -this.position.y, -this.position.z);
			view.rotateXYZ(-this.rotation.x, -this.rotation.y, -this.rotation.z);
			
			return proj.x(view);
		},
		
		toSkyboxMatrix: function(width, height){
			var proj = Matrix.I(4);
			if(this.perspective){
				proj = makePerspective(this.fov, width/height, this.near, this.far);
			}else{
				proj = makeOrtho(0.5, (width/height)*this.orthoSize, 0.5, (width/height)*this.orthoSize, this.near, this.far);
			}
			
			var view = Matrix.I(4);
			
			view.rotateXYZ(-this.rotation.x, -this.rotation.y, -this.rotation.z);
			
			return proj.x(view);
		},
		
		getWorldPosition: function(){
			var x = this.position.x;
			var y = this.position.y;
			var z = this.position.z;
			
			return {
				x: x,
				y: y,
				z: z
			};
		},
		
		ontick: function(){}
	};
}

NGL.prototype.create2DCamera = function(){
	return {
		objectType: NGL.objectTypes.CAMERA,
		
		offset: {x: 0, y: 0},
		rotation: 0,
		
		near: 0,
		far: 1000.0,
		
		toMatrix: function(width, height){
			var proj = Matrix.I(4);
			
			proj = makeOrtho(0, width, 0, height, this.near, this.far);
			
			var view = Matrix.I(4);
			
			view.translate(this.offset.x, this.offset.y, -1);
			view.rotateXYZ(0, 0, this.rotation);
			
			return proj.x(view);
		},
		
		toSkyboxMatrix: function(width, height){
			var proj = Matrix.I(4);
			
			proj = makeOrtho(0, width, 0, height, this.near, this.far);
			
			var view = Matrix.I(4);
			
			view.rotateXYZ(0, 0, this.rotation);
			
			return proj.x(view);
		},
		
		getWorldPosition: function(){
			var x = -this.offset.x;
			var y = -this.offset.y;
			
			return {
				x: x,
				y: y,
				z: 0
			};
		},
		
		ontick: function(){}
	};
}

NGL.prototype.createECUCamera = function(){
	return {
		objectType: NGL.objectTypes.CAMERA,
		
		eye: {x: 3, y: 3, z: 3},
		center: {x: 0, y: 0, z: 0},
		up: {x: 0, y: 0, z: 1},
		
		perspective: true,
		orthoSize: 1,
		
		fov: 70,
		near: 0.1,
		far: 1000,
		
		toMatrix: function(width, height){
			var proj = Matrix.I(4);
			if(this.perspective){
				proj = makePerspective(this.fov, width/height, this.near, this.far);
			}else{
				proj = makeOrtho(0.5, this.orthoSize, 0.5, this.orthoSize, this.near, this.far);
			}
			
			var view = makeLookAt(this.eye.x, this.eye.y, this.eye.z, this.center.x, this.center.y, this.center.z, this.up.x, this.up.y, this.up.z);
			
			return proj.x(view);
		},
		
		toSkyboxMatrix: function(width, height){
			var proj = Matrix.I(4);
			if(this.perspective){
				proj = makePerspective(this.fov, width/height, this.near, this.far);
			}else{
				proj = makeOrtho(0.5, this.orthoSize, 0.5, this.orthoSize, this.near, this.far);
			}
			
			var view = makeLookAt(0, 0, 0, this.center.x - this.eye.x, this.center.y - this.eye.y, this.center.z - this.eye.z, this.up.x, this.up.y, this.up.z);
			
			return proj.x(view);
		},
		
		getWorldPosition: function(){
			var x = this.eye.x;
			var y = this.eye.y;
			var z = this.eye.z;
			
			return {
				x: x,
				y: y,
				z: z
			};
		},
		
		ontick: function(){}
	};
}

NGL.prototype.createFPSCamera = function(){
	var cam = this.createECUCamera();
	
	cam.eye.x = 0;
	cam.eye.y = 0;
	cam.eye.z = 1.8;
	cam.center.x = 0;
	cam.center.y = 1;
	cam.center.z = 1.8;
	
	cam.forward = NGL.keyCodes.w;
	cam.strafeLeft = NGL.keyCodes.a;
	cam.backward = NGL.keyCodes.s;
	cam.strafeRight = NGL.keyCodes.d;
	cam.goUp = NGL.keyCodes.spacebar;
	cam.goDown = NGL.keyCodes.shift;
	
	cam.run = NGL.keyCodes.ctrl;
	
	cam.mouseSensitivity = 0.4;
	cam.orientation = {x: 0, y: 0, z: 0};
	cam.phi = 0;
	cam.theta = 0;
	
	cam.speed = 2;
	cam.runSpeed = 4;
	
	cam.canFly = false;
	
	var that = this;
	cam.ontick = function(delta){
		// Quietly get the events
		var events = that.getEventPool(true);
		
		this.phi += -events.mouse.movement.y * this.mouseSensitivity;
		this.theta += -events.mouse.movement.x * this.mouseSensitivity;
		
		if(this.phi > 89) {
			this.phi = 89;
		} else if (this.phi < -89) {
			this.phi = -89;
		}
		
		var phiRadian = this.phi * Math.PI / 180;
		var thetaRadian = this.theta * Math.PI / 180;
		
		this.orientation.x = Math.cos(phiRadian) * Math.cos(thetaRadian);
		this.orientation.y = Math.cos(phiRadian) * Math.sin(thetaRadian);
		this.orientation.z = Math.sin(phiRadian);
		var orientationVect = $V([this.orientation.x, this.orientation.y, this.orientation.z]).toUnitVector();
		
		var orientation2d = $V([orientationVect.elements[0], orientationVect.elements[1], 0.0]).toUnitVector();
		var upVector = $V([this.up.x, this.up.y, this.up.z]);
		var lateral = upVector.cross(orientation2d).toUnitVector();
		
		var speed = this.speed;
		
		if(that.isKey(this.run)){
			speed = this.runSpeed;
		}
		
		var eyeVector = $V([this.eye.x, this.eye.y, this.eye.z]);
		if(that.isKey(this.forward)){
			eyeVector = eyeVector.add(orientation2d.x(speed * delta));
		}
		
		if(that.isKey(this.backward)){
			eyeVector = eyeVector.subtract(orientation2d.x(speed * delta));
		}
		
		if(that.isKey(this.strafeLeft)){
			eyeVector = eyeVector.add(lateral.x(speed * delta));
		}
		
		if(that.isKey(this.strafeRight)){
			eyeVector = eyeVector.subtract(lateral.x(speed * delta));
		}
		
		if(this.canFly){
			if(that.isKey(this.goUp)){
				eyeVector.elements[2] += speed * delta;
			}

			if(that.isKey(this.goDown)){
				eyeVector.elements[2] -= speed * delta;
			}
		}
		
		var centerVect = $V([this.center.x, this.center.y, this.center.z]);
		centerVect = eyeVector.add(orientationVect);
		
		this.eye.x = eyeVector.elements[0];
		this.eye.y = eyeVector.elements[1];
		this.eye.z = eyeVector.elements[2];
		this.orientation.x = orientationVect.elements[0];
		this.orientation.y = orientationVect.elements[1];
		this.orientation.z = orientationVect.elements[2];
		this.center.x = centerVect.elements[0];
		this.center.y = centerVect.elements[1];
		this.center.z = centerVect.elements[2];
	}
	
	return cam;
}

NGL.prototype.createMaterial = function(args){
	args = args || {};
	
	var texture = args.texture;
	var normalTexture = args.normalTexture;
	var specularTexture = args.specularTexture;
	var color = args.color;
	var hardness = args.hardness;
	var shiness = args.shiness;
	var shaderProgram = args.shaderProgram;
	
	var defaultColor = [0.8, 0.8, 0.8, 1.0];
	
	if(typeof color !== "object"){
		color = defaultColor;
	}else if(color.length){
		if(color.length === 3){
			if(typeof color[0] === "number" && typeof color[1] === "number" && typeof color[2] === "number"){
				color.push(1);
			}else{
				color = defaultColor;
			}
		}else if(color.length >= 4){
			if(!(typeof color[0] === "number" && typeof color[1] === "number" && typeof color[2] === "number" && typeof color[3] === "number")){
				color = defaultColor;
			}
		}else{
			color = defaultColor;
		}
	}else if(typeof color.r === "number" && typeof color.g === "number" && typeof color.b === "number"){
		if(typeof color.a === "number"){
			color = [color.r, color.g, color.b, color.a];
		}else{
			color = [color.r, color.g, color.b, 1];
		}
	}else{
		color = defaultColor;
	}
	
	var that = this;
	var mat = {
		texture: texture,
		normalTexture: normalTexture,
		specularTexture: specularTexture,
		color: color,
		hardness: (typeof hardness === "number" ? hardness : 8.0),
		shiness: (typeof shiness === "number" ? shiness : 0.9),
		reflectivity: 0,
		shaderProgram: (typeof shaderProgram === "string" && that.programs[shaderProgram] ? shaderProgram : "material")
	};
	
	return mat;
}

NGL.prototype.createSkybox = function(color, cubemap){
	var skybox = {};
	skybox.objectType = NGL.objectTypes.SKYBOX;
	
	skybox.vertices = [
		-1, 1, -1, -1, -1, -1, -1, -1, 1, 1, 1, -1, 1, -1, -1, 1, 1, 1, 1, -1, 1, -1, 1, 1
	];
	skybox.indices = [
		0, 1, 2, 3, 4, 1, 5, 6, 4, 7, 2, 6, 1, 4, 6, 3, 0, 7, 7, 0, 2, 0, 3, 1, 3, 5, 4, 5, 7, 6, 2, 1, 6, 5, 3, 7
	];
	
	// skybox.cubemap = cubemap;
	skybox.cubemap = null; // WIP
	
	skybox.color = color;
	skybox.visible = true;
	
	skybox.verticesBuffer = this.gl.createBuffer();
	this.gl.bindBuffer(this.gl.ARRAY_BUFFER, skybox.verticesBuffer);
	this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(skybox.vertices), this.gl.STATIC_DRAW);
	
	this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);
	
	skybox.indicesBuffer = this.gl.createBuffer();
	this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, skybox.indicesBuffer);
	this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(skybox.indices), this.gl.STATIC_DRAW);

	this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, null);
	
	return skybox;
};

NGL.prototype.createScene = function(opaque, shadeless){
	var sce = {
		objects: {},
		sunDir: {x: 0, y: 0, z: -1},
		skybox: null,
		
		activeCamera: null,
		shadeless: (typeof shadeless === "boolean" ? shadeless : false),
		opaque: (typeof opaque === "boolean" ? opaque : true)
	};
	sce.objectType = NGL.objectTypes.SCENE;
	
	sce.skybox = this.createSkybox([1.0, 1.0, 1.0, 1.0]);
	
	sce.addObject = function(obj, id){
		if(!obj){
			return;
		}
		if(typeof id === "undefined" || typeof id === "null"){
			id = 0;
			
			while(this.objects[id]){
				id++;
			}
		}
		
		this.objects[id] = obj;
	}
	
	return sce;
}

NGL.prototype.loadHeightmap = function(heightmapImage){
	var heightmap = {};
	heightmap.objectType = NGL.objectTypes.HEIGHTMAP;
	
	heightmap.image = heightmapImage;
	heightmap.data = [];
	
	heightmap.reload = function(){
		if(!this.image){
			this.data = [0];
			
			return;
		}
		
		var pixels = NGL.readPixels(this.image);
		
		this.data = [];
		for(var i = 0; i < pixels.length; i+=4){
			this.data.push(pixels[i]/255);
		}
	}
	
	heightmap.reload();
	
	heightmap.getHeight = function(x, y){
		var realX = Math.floor(x * this.image.width);
		var realY = Math.floor(y * this.image.height);
		
		var index = realX * this.image.width + realY;
		
		var height = this.data[index];
		
		return height || 0;
	}
	
	return heightmap;
}

// WIP
NGL.prototype.createMaterialMap = function(mapTexture, materials){
	materials = materials || [];
	
	var materialMap = {};
	materialMap.objectType = NGL.objectTypes.MATERIALMAP;
	
	materialMap.texture = mapTexture;
	materialMap.materials = materials.slice(0);
	
	return materialMap;
}

NGL.prototype.createTerrain = function(args){
	args = args || {};
	
	var heightmap = args.heightmap;
	var xSize = args.xSize;
	var ySize = args.ySize;
	var maxHeight = args.maxHeight;
	
	var terrain = {};
	terrain.objectType = NGL.objectTypes.TERRAIN;
	
	terrain.ontick = function(){};
	terrain.visible = true;
	terrain.backface = false;
	
	terrain.position = {x: 0, y: 0, z: 0};
	terrain.rotation = {x: 0, y: 0, z: 0};
	terrain.scale = {x: 1, y: 1, z: 1};
	
	terrain.heightmap = heightmap;
	terrain.xSize = xSize || 256;
	terrain.ySize = ySize || 256;
	terrain.worldSize = 100;
	terrain.maxHeight = maxHeight || 20;
	
	terrain.color = args.color || [1, 1, 1, 1];
	
	terrain.vertices = [];
	terrain.normals = [];
	terrain.textureCoords = [];
	terrain.indices = [];
	terrain.wireIndices = [];
	terrain.size = 0;
	terrain.wireSize = 0;
	
	terrain.wire = false;
	
	terrain.verticesBuffer = this.gl.createBuffer();
	terrain.normalsBuffer = this.gl.createBuffer();
	terrain.textureCoordsBuffer = this.gl.createBuffer();
	terrain.indicesBuffer = this.gl.createBuffer();
	terrain.wireIndicesBuffer = this.gl.createBuffer();
	
	var that = this;
	terrain.generate = function(){
		var verticesHeight = [];

		var vertices = [];
		var normals = [];
		var textureCoords = [];
		var indices = [];
		var wireIndices = [];

		var vertexPointer = 0;
		for(var x = 0; x < this.xSize; x++){
			for(var y = 0; y < this.ySize; y++){
				if(this.heightmap){
					var height = this.heightmap.getHeight(x/this.xSize, y/this.ySize);
					verticesHeight[vertexPointer] = height * this.maxHeight - this.maxHeight/2;
				}else{
					verticesHeight[vertexPointer] = 0;
				}
				
				vertexPointer++;
			}
		}
		
		var useCrossProduct = true;
		var lol = this;
		var calcNormal = function(x, y, height, indice){
			if(useCrossProduct){
				/* Cross product (good old method !) */
				if(!lol.heightmap){
					normals.push(0);
					normals.push(0);
					normals.push(1);

					return;
				}

				var height1 = verticesHeight[indice+1] || height || verticesHeight[indice] || 0;
				var height2 = verticesHeight[indice+lol.xSize] || height || verticesHeight[indice] || 0;

				var v0 = $V([x, y, height]);
				var v1 = $V([x+1, y, height1]);
				var v2 = $V([x, y+1, height2]);

				var edge1 = v1.subtract(v0).toUnitVector();
				var edge2 = v2.subtract(v0).toUnitVector();

				var normal = edge1.cross(edge2).toUnitVector();

				normals.push(normal.elements[0]);
				normals.push(normal.elements[1]);
				normals.push(normal.elements[2]);
			}else{
				/* Finite difference method (so weird and ugly) */
				if(!lol.heightmap){
					normals.push(0);
					normals.push(0);
					normals.push(1);
					
					return;
				}

				var bitouni = function(x, y){
					return x * lol.xSize + y;
				}

				var heightL = verticesHeight[bitouni(x, y-1)] + lol.maxHeight/2;
				var heightR = verticesHeight[bitouni(x, y+1)] + lol.maxHeight/2;
				var heightD = verticesHeight[bitouni(x+1, y)] + lol.maxHeight/2;
				var heightU = verticesHeight[bitouni(x-1, y)] + lol.maxHeight/2;

				var normal = $V([heightL-heightR, 2, heightD, heightU]);
				normal = normal.toUnitVector();

				normals.push(normal.elements[0]);
				normals.push(normal.elements[1]);
				normals.push(normal.elements[2]);
			}
		}
		
		vertexPointer = 0;
		for(var x = 0; x < this.xSize; x++){
			for(var y = 0; y < this.ySize; y++){
				var xPosition = x/this.xSize;
				var yPosition = y/this.ySize;

				var height = verticesHeight[vertexPointer];

				vertices.push(x/this.xSize * this.worldSize);
				vertices.push(y/this.ySize * this.worldSize);
				vertices.push(height);

				textureCoords.push(xPosition);
				textureCoords.push(yPosition);

				calcNormal(x, y, height, vertexPointer);

				vertexPointer++;
			}
		}

		var doTriangle = function(a, b, c){
			indices.push(c);
			indices.push(b);
			indices.push(a);

			wireIndices.push(c);
			wireIndices.push(b);
			wireIndices.push(b);
			wireIndices.push(a);
			wireIndices.push(a);
			wireIndices.push(c);
		}

		vertexPointer = 0;
		for(var x = 0; x < this.xSize-1; x++){
			for(var y = 0; y < this.ySize-1; y++){
				var tl = x*this.xSize+y; // here
				var tr = tl+this.xSize; // Right
				var bl = tl+1; // Bottom
				var br = tr+1; // Bottom right

				doTriangle(tl, bl, br);
				doTriangle(tr, tl, br);

				vertexPointer++;
			}
		}

		this.vertices = vertices;
		this.normals = normals;
		this.textureCoords = textureCoords;
		this.indices = indices;
		this.wireIndices = wireIndices;
		this.size = indices.length;
		this.wireSize = wireIndices.length;

		that.gl.bindBuffer(that.gl.ARRAY_BUFFER, this.verticesBuffer);
		that.gl.bufferData(that.gl.ARRAY_BUFFER, new Float32Array(this.vertices), that.gl.STATIC_DRAW);

		that.gl.bindBuffer(that.gl.ARRAY_BUFFER, this.textureCoordsBuffer);
		that.gl.bufferData(that.gl.ARRAY_BUFFER, new Float32Array(this.textureCoords), that.gl.STATIC_DRAW);
		
		that.gl.bindBuffer(that.gl.ARRAY_BUFFER, this.normalsBuffer);
		that.gl.bufferData(that.gl.ARRAY_BUFFER, new Float32Array(this.normals), that.gl.STATIC_DRAW);

		that.gl.bindBuffer(that.gl.ARRAY_BUFFER, null);

		that.gl.bindBuffer(that.gl.ELEMENT_ARRAY_BUFFER, this.indicesBuffer);
		that.gl.bufferData(that.gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.indices), that.gl.STATIC_DRAW);

		that.gl.bindBuffer(that.gl.ELEMENT_ARRAY_BUFFER, this.wireIndicesBuffer);
		that.gl.bufferData(that.gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.wireIndices), that.gl.STATIC_DRAW);
		
		that.gl.bindBuffer(that.gl.ELEMENT_ARRAY_BUFFER, null);
	}
	
	terrain.materialMappings = [];
	
	terrain.generate();
	
	return terrain;
}

NGL.prototype.createTextObject = function(args){
	args = args || {};
	
	var text = args.text;
	var font = args.font;
	var color = args.color;
	var x = args.x;
	var y = args.y;
	var extraCharSpace = args.extraCharSpace;
	var extraLineSpace = args.extraLineSpace;
	var size = args.size;
	
	if(!font){
		return null;
	}
	
	extraCharSpace = extraCharSpace || 0;
	extraLineSpace = extraLineSpace || 0;
	
	var obj = {};
	obj.objectType = NGL.objectTypes.TEXTOBJECT;
	obj.backface = false;
	
	obj.vertices = [];
	obj.textureCoords = [];
	obj.font = font;
	obj.indices = [];
	obj.size = 0;
	obj.drawMode = "TRIANGLES";
	obj.visible = true;
	obj.ontick = function(){};
	obj.text = text;
	obj.color = color || [0, 0, 0, 1];
	obj.extraCharSpace = extraCharSpace;
	obj.extraLineSpace = extraLineSpace;
	
	obj.setText = function(text){
		this.text = text || "";
		this.refresh();
	}
	
	var that = this;
	obj.refresh = function(){
		this.vertices = [];
		this.textureCoords = [];
		this.indices = [];
		
		var caret = {x: 0, y: 0};

		var charIndex = 0;
		for(var x in this.text){
			var currChar = this.text[x];
			var currASCII = currChar.charCodeAt(0);
			
			if(this.text[x] === "\n"){
				caret.y -= this.font.lineHeight + this.extraLineSpace;
				caret.x = 0;
				continue;
			}
			if(this.text[x] === "\t"){
				caret.x += this.font.chars[" ".charCodeAt(0)].xadvance*4;
				continue;
			}
			
			if(!this.font.chars[currASCII]){
				currASCII = 127;
			}

			var fontChar = this.font.chars[currASCII];

			var topLeft = [
				caret.x + fontChar.xoffset,
				caret.y - fontChar.yoffset,
				0
			];
			var topRight = [
				caret.x + fontChar.xoffset + fontChar.width,
				caret.y - fontChar.yoffset,
				0
			];
			var bottomLeft = [
				caret.x + fontChar.xoffset,
				caret.y - fontChar.yoffset - fontChar.height,
				0
			];
			var bottomRight = [
				caret.x + fontChar.xoffset + fontChar.width,
				caret.y - fontChar.yoffset - fontChar.height,
				0
			];

			var topLeftCoord = [
				fontChar.x / this.font.scaleW,
				fontChar.y / this.font.scaleH
			];
			var topRightCoord = [
				(fontChar.x + fontChar.width) / this.font.scaleW,
				(fontChar.y) / this.font.scaleH
			];
			var bottomLeftCoord = [
				fontChar.x / this.font.scaleW,
				(fontChar.y + fontChar.height) / this.font.scaleH
			];
			var bottomRightCoord = [
				(fontChar.x + fontChar.width) / this.font.scaleW,
				(fontChar.y + fontChar.height) / this.font.scaleH
			];

			this.vertices = this.vertices.concat(topLeft);
			this.vertices = this.vertices.concat(topRight);
			this.vertices = this.vertices.concat(bottomLeft);
			this.vertices = this.vertices.concat(bottomRight);

			this.textureCoords = this.textureCoords.concat(topLeftCoord);
			this.textureCoords = this.textureCoords.concat(topRightCoord);
			this.textureCoords = this.textureCoords.concat(bottomLeftCoord);
			this.textureCoords = this.textureCoords.concat(bottomRightCoord);

			this.indices = this.indices.concat([
				charIndex, charIndex+2, charIndex+3,
				charIndex, charIndex+3, charIndex+1
			]);

			caret.x += fontChar.xadvance + this.extraCharSpace;
			charIndex += 4;
		}
		
		that.gl.bindBuffer(that.gl.ARRAY_BUFFER, this.verticesBuffer);
		that.gl.bufferData(that.gl.ARRAY_BUFFER, new Float32Array(this.vertices), that.gl.STATIC_DRAW);

		that.gl.bindBuffer(that.gl.ARRAY_BUFFER, this.textureCoordsBuffer);
		that.gl.bufferData(that.gl.ARRAY_BUFFER, new Float32Array(this.textureCoords), that.gl.STATIC_DRAW);

		that.gl.bindBuffer(that.gl.ARRAY_BUFFER, null);

		that.gl.bindBuffer(that.gl.ELEMENT_ARRAY_BUFFER, this.indicesBuffer);
		that.gl.bufferData(that.gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.indices), that.gl.STATIC_DRAW);

		that.gl.bindBuffer(that.gl.ELEMENT_ARRAY_BUFFER, null);
		
		this.size = this.indices.length;
	}
	
	obj.verticesBuffer = this.gl.createBuffer();
	obj.textureCoordsBuffer = this.gl.createBuffer();
	obj.indicesBuffer = this.gl.createBuffer();
	
	x = x || 0;
	y = y || 0;
	size = size || 1;
	
	obj.position = {x: x, y: y, z: 0};
	obj.rotation = {x: 0, y: 0, z: 0};
	obj.scale = {x: size, y: size, z: 1};
	
	obj.refresh();
	
	return obj;
}

NGL.prototype.getEventPool = function(quietly){
	quietly = (typeof quietly === "boolean" ? quietly : false);
	
	var keyboardEvents = [];
	
	for(var x in this.eventPool.down){
		if(!this.eventPool.down[x].addedToPool){
			keyboardEvents.push({
				key: parseInt(x),
				type: "down"
			});
			if(!quietly){
				this.eventPool.down[x].addedToPool = true;
			}
		}
	}
	for(var x in this.eventPool.up){
		if(!this.eventPool.up[x].addedToPool){
			keyboardEvents.push({
				key: parseInt(x),
				type: "up"
			});
			if(!quietly){
				this.eventPool.up[x].addedToPool = true;
			}
		}
	}
	
	var movX = this.eventPool.mouse.movement.x;
	var movY = this.eventPool.mouse.movement.y;
	
	var events = {
		keyboard: keyboardEvents,
		mouse: {
			movement: {
				x: movX,
				y: movY
			}
		}
	};
	
	if(!quietly){
		// Reset da eventpool
		this.eventPool.mouse = {
			down: [],
			up: [],
			movement: {x: 0, y: 0}
		};
	}
	
	return events;
}

NGL.prototype.createShaderProgram = function(vSource, fSource){
	var vShader = this.gl.createShader(this.gl.VERTEX_SHADER);
	var fShader = this.gl.createShader(this.gl.FRAGMENT_SHADER);
	
	this.gl.shaderSource(vShader, vSource);
	this.gl.shaderSource(fShader, fSource);
	
	this.gl.compileShader(vShader);
	if (!this.gl.getShaderParameter(vShader, this.gl.COMPILE_STATUS)) {  
		throw new Error("Error while compiling vertex shader: " + this.gl.getShaderInfoLog(vShader));
		return;
	}
	
	this.gl.compileShader(fShader);
	if (!this.gl.getShaderParameter(fShader, this.gl.COMPILE_STATUS)) {  
		throw new Error("Error while compiling fragment shader: " + this.gl.getShaderInfoLog(fShader));
		return;
	}
	
	var prog = this.gl.createProgram();
	prog.objectType = NGL.objectTypes.SHADERPROGRAM;
	
	this.gl.attachShader(prog, vShader);
	this.gl.attachShader(prog, fShader);
	this.gl.linkProgram(prog);
	
	if (!this.gl.getProgramParameter(prog, this.gl.LINK_STATUS)) {
		throw new Error("Shader program creation failed!");
		return;
	}
	
	prog.attributes = {};
	prog.uniforms = {};
	prog.addAttribute = function(gl, name){
		gl.useProgram(this);
			this.attributes[name] = gl.getAttribLocation(this, name);
		gl.useProgram(null);
	}
	prog.addUniform = function(gl, name){
		gl.useProgram(this);
			this.uniforms[name] = gl.getUniformLocation(this, name);
		gl.useProgram(null);
	}
	
	return prog;
}

// Texture images order: [+x, -x, +y, -y, +z, -z]
NGL.prototype.createCubemap = function(textureImages){
	if(!textureImages || textureImages.length < 6){
		return;
	}
	
	if(typeof filters !== "boolean"){
		filters = true;
	}
	
	var texture = this.gl.createTexture();
	this.gl.bindTexture(this.gl.TEXTURE_CUBE_MAP, texture);
	
	this.gl.texParameteri(this.gl.TEXTURE_CUBE_MAP, this.gl.TEXTURE_MAG_FILTER, this.gl.LINEAR);
	this.gl.texParameteri(this.gl.TEXTURE_CUBE_MAP, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR);
	this.gl.texParameteri(this.gl.TEXTURE_CUBE_MAP, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
	this.gl.texParameteri(this.gl.TEXTURE_CUBE_MAP, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);
	
	this.gl.texImage2D(this.gl.TEXTURE_CUBE_MAP_POSITIVE_X, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, textureImages[0]);
	this.gl.texImage2D(this.gl.TEXTURE_CUBE_MAP_NEGATIVE_X, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, textureImages[1]);
	this.gl.texImage2D(this.gl.TEXTURE_CUBE_MAP_POSITIVE_Y, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, textureImages[2]);
	this.gl.texImage2D(this.gl.TEXTURE_CUBE_MAP_NEGATIVE_Y, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, textureImages[3]);
	this.gl.texImage2D(this.gl.TEXTURE_CUBE_MAP_POSITIVE_Z, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, textureImages[4]);
	this.gl.texImage2D(this.gl.TEXTURE_CUBE_MAP_NEGATIVE_Z, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, textureImages[5]);
	
	this.gl.bindTexture(this.gl.TEXTURE_CUBE_MAP, null);
	
	return texture;
}

NGL.prototype.loadTexture = function(textureImage, filters){
	if(typeof filters !== "boolean"){
		filters = true;
	}
	
	var texture = this.gl.createTexture();
	texture.objectType = NGL.objectTypes.TEXTURE;
	texture.textureImage = textureImage;
	texture.hasFilters = filters;
	
	this.gl.bindTexture(this.gl.TEXTURE_2D, texture);
	this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, textureImage);
	if(filters){
		this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.LINEAR);
		this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR_MIPMAP_LINEAR);
		this.gl.generateMipmap(this.gl.TEXTURE_2D);
	}else{
		this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.NEAREST);
		this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.NEAREST_MIPMAP_LINEAR);
		this.gl.generateMipmap(this.gl.TEXTURE_2D);
	}
	this.gl.bindTexture(this.gl.TEXTURE_2D, null);
	
	return texture;
}

NGL.prototype.addScene = function(sce, index){
	if(!sce){
		return;
	}
	if(typeof index !== "number"){
		index = this.scenes.length;
	}
	
	this.scenes.splice(index, 0, sce);
}

NGL.prototype.createObject = function(args){
	args = args || {};
	
	var size = args.size;
	var visible = args.visible;
	var colors = args.colors;
	var material = args.material;
	var drawMode = args.drawMode;
	var position = args.position;
	var rotation = args.rotation;
	var scale = args.scale;
	
	var vertices = args.vertices || [];
	var normals = args.normals || [];
	var colors = args.colors || [];
	var textureCoords = args.textureCoords || [];
	var indices = args.indices || [];
	
	if(size === undefined || size === null || size < 0){
		size = indices.length;
	}
	
	var that = this;
	var obj = {
		vertices: vertices.slice(0),
		normals: normals.slice(0),
		textureCoords: textureCoords.slice(0),
		colors: colors.slice(0),
		indices: indices.slice(0),
		size: (typeof size === "number" ? size : indices.length),
		wireSize: 0,
		visible: (typeof visible === "boolean" ? visible : true),
		
		material: material || that.createMaterial(),
		drawMode: (typeof drawMode === "string" ? (that.gl[drawMode] ? drawMode : "TRIANGLES") : "TRIANGLES"),
		
		position: (typeof position === "object" ? {
			x: (typeof position.x === "number" ? position.x : 0),
			y: (typeof position.y === "number" ? position.y : 0),
			z: (typeof position.z === "number" ? position.z : 0)
		} : {x: 0, y: 0, z: 0}),
		rotation: (typeof rotation === "object" ? {
			x: (typeof rotation.x === "number" ? rotation.x : 0),
			y: (typeof rotation.y === "number" ? rotation.y : 0),
			z: (typeof rotation.z === "number" ? rotation.z : 0)
		} : {x: 0, y: 0, z: 0}),
		scale: (typeof scale === "object" ? {
			x: (typeof scale.x === "number" ? scale.x : 1),
			y: (typeof scale.y === "number" ? scale.y : 1),
			z: (typeof scale.z === "number" ? scale.z : 1)
		} : {x: 1, y: 1, z: 1}),
		
		ontick: function(){}
	};
	obj.objectType = NGL.objectTypes.MESHOBJECT;
	obj.backface = false;
	
	if(obj.vertices.length !== 0){
		obj.verticesBuffer = this.gl.createBuffer();
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, obj.verticesBuffer);
		this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(obj.vertices), this.gl.STATIC_DRAW);
	}
	
	if(obj.normals.length !== 0){
		obj.normalsBuffer = this.gl.createBuffer();
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, obj.normalsBuffer);
		this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(obj.normals), this.gl.STATIC_DRAW);
	}
	
	if(obj.colors.length !== 0){
		obj.colorsBuffer = this.gl.createBuffer();
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, obj.colorsBuffer);
		this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(obj.colors), this.gl.STATIC_DRAW);
	}
	
	if(obj.textureCoords.length !== 0){
		obj.textureCoordsBuffer = this.gl.createBuffer();
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, obj.textureCoordsBuffer);
		this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(obj.textureCoords), this.gl.STATIC_DRAW);
	}
	
	this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);
	
	obj.wireIndices = [];
	obj.wire = false;
	// generate wire indices
	for(var i = 0; i < indices.length; i+=3){
		obj.wireIndices.push(indices[i]);
		obj.wireIndices.push(indices[i+1]);
		obj.wireIndices.push(indices[i+1]);
		obj.wireIndices.push(indices[i+2]);
		obj.wireIndices.push(indices[i+2]);
		obj.wireIndices.push(indices[i]);
	}
	obj.wireSize = obj.wireIndices.length;
	
	obj.indicesBuffer = this.gl.createBuffer();
	this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, obj.indicesBuffer);
	this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(obj.indices), this.gl.STATIC_DRAW);
	
	obj.wireIndicesBuffer = this.gl.createBuffer();
	this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, obj.wireIndicesBuffer);
	this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(obj.wireIndices), this.gl.STATIC_DRAW);

	this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, null);
	
	return obj;
}

NGL.prototype.loop = function(){
	this.delta = (Date.now() - this.lastUpdate) / 1000;
	this.lastUpdate = Date.now();
	
	this.frameCount++;
	if(Date.now() - this.lastFPSUpdate >= 1000){
		this.fps = this.frameCount;
		this.frameCount = 0;
		this.lastFPSUpdate = Date.now();
	}
	
	for(var i = this.scenes.length-1; i >= 0; i--){
		var sce = this.scenes[i];
		
		for(y in sce.objects){
			sce.objects[y].ontick(this.delta);
		}
		
		if(sce.activeCamera){
			sce.activeCamera.ontick(this.delta);
		}
	}
}

NGL.prototype.loadObj = function(file, callback){
	var readedVertices = [];
	var readedNormals = [];
	var readedTexCoords = [];
	
	var verticesProt = [];
	var faces = [];
	
	var that = this;
	NGL.loadFile(file, "text", function(objSource){
		var lines = objSource.split("\n");

		for(var i = 0; i < lines.length; i++){
			var line = lines[i];
			
			var words = line.split(" ");

			if(words[0] == "v"){
				readedVertices.push(parseFloat(words[1]));
				readedVertices.push(parseFloat(words[2]));
				readedVertices.push(parseFloat(words[3]));
			}else if(words[0] == "vn"){
				readedNormals.push(parseFloat(words[1]));
				readedNormals.push(parseFloat(words[2]));
				readedNormals.push(parseFloat(words[3]));
			}else if(words[0] == "vt"){
				readedTexCoords.push(parseFloat(words[1]));
				readedTexCoords.push(parseFloat(words[2]));
			}else if(words[0] == "f"){
				var verts = [words[1].split("/"), words[2].split("/"), words[3].split("/")];

				for(var j = 0; j < verts.length; j++){
					var vertProt = {
						vertIndex: (parseInt(verts[j][0])-1),
						texCoordsIndex: (parseInt(verts[j][1])-1),
						normIndex: (parseInt(verts[j][2])-1)
					};

					var doublon = false;
					var globalIndex = 0;
					for(var e = 0; e < verticesProt.length; e++){
						var currVertProt = verticesProt[e];
						
						if(currVertProt.vertIndex == vertProt.vertIndex && currVertProt.texCoordsIndex == vertProt.texCoordsIndex && currVertProt.normIndex == vertProt.normIndex){
							doublon = true;
							globalIndex = e;
							break;
						}

						globalIndex = e+1;
					}

					if(!doublon){
						verticesProt.push(vertProt);
					}
					
					faces.push(globalIndex);
				}
			}
		}

		var vertices = [];
		var texCoords = [];
		var normals = [];

		for(var i = 0; i < verticesProt.length; i++){
			var vertIndex = verticesProt[i].vertIndex * 3;
			var texCoordsIndex = verticesProt[i].texCoordsIndex * 2;
			var normIndex = verticesProt[i].normIndex * 3;
			
			vertices.push(readedVertices[vertIndex]);
			vertices.push(readedVertices[vertIndex+1]);
			vertices.push(readedVertices[vertIndex+2]);
			
			texCoords.push(readedTexCoords[texCoordsIndex]);
			texCoords.push(readedTexCoords[texCoordsIndex+1]);
			
			normals.push(readedNormals[normIndex]);
			normals.push(readedNormals[normIndex+1]);
			normals.push(readedNormals[normIndex+2]);
		}
		
		var obj = that.createObject({
			vertices: vertices,
			normals: normals,
			textureCoords: texCoords,
			indices: faces,
			size: -1
		});
		callback(obj);
	});
}

NGL.prototype.loadFont = function(fontFile, callback, thisArg, charWidth, glowness){
	thisArg = thisArg || this;
	
	var path = fontFile.split("/");
	var folder = "";
	
	path.forEach(function(f, i){
		if(i < path.length-1){
			folder += f+"/";
		}
	});
	
	var fnt = {};
	fnt.objectType = NGL.objectTypes.FONT;
	fnt.chars = [];
	fnt.pages = [];
	fnt.charWidth = (typeof charWidth === "number" ? charWidth : 0.5);
	fnt.glowness = (typeof glowness === "number" ? glowness : 0.02);
	
	NGL.loadFile(fontFile, "text", function(data){
		var lines = data.split("\n");
		
		lines.forEach(function(line, lineIndex){
			var attributes = line.split(" ");
			
			if(line.startsWith("char ")){
				var currChar = {};
				
				attributes.forEach(function(att, attIndex){
					var pair = att.split("=");

					if(pair.length === 2){
						currChar[pair[0]] = parseInt(pair[1]);
					}
				});
				
				if(currChar.id){
					fnt.chars[currChar.id] = currChar;
				}
			}else if(line.startsWith("page ")){
				var file = null;
				var pageID = 0;
				
				attributes.forEach(function(att, attIndex){
					var pair = att.split("=");

					if(pair.length === 2){
						if(pair[0] === "file"){
							file = pair[1].slice(1, pair[1].length-2);
						}if(pair[0] === "id"){
							id = parseInt(pair[1]);
						}
					}
				});
				
				if(file){
					var fullPath = folder+file;
					NGL.loadImage(fullPath, function(img){
						fnt.pages[id] = this.loadTexture(img);
					}, this);
				}
			}else if(line.startsWith("common ")){
				attributes.forEach(function(att, attIndex){
					var pair = att.split("=");

					if(pair.length === 2){
						if(pair[0] === "pages"){
							pair[0] = "pageCount";
						}
						
						fnt[pair[0]] = parseInt(pair[1]);
					}
				});
			}else if(line.startsWith("info ")){
				attributes.forEach(function(att, attIndex){
					var pair = att.split("=");

					if(pair.length === 2){
						if(pair[0] === "face"){
							fnt.name = pair[1].slice(1, pair[1].length-1);
						}
					}
				});
			}
		}, this);
		
		callback.call(thisArg, fnt);
	}, this);
}

NGL.prototype.getCommonKeyCode = function(key){
	if(key === 181 && this.navigator.startsWith("Firefox")){
		return 173;
	}else if(key === 182 && this.navigator.startsWith("Firefox")){
		return 174;
	}else if(key === 183 && this.navigator.startsWith("Firefox")){
		return 175;
	}
	
	return key;
}

NGL.prototype.isKey = function(key){
	if(typeof key === "string"){
		return this.controls.keys[NGL.keyCodes[key]] || false;
	}else if(typeof key === "number"){
		key = this.getCommonKeyCode(key);
		
		return this.controls.keys[key] || false;
	}
	
	console.log("Warning: '"+key+"' is not a valid key identifier. Use key codes or key name.");
	return false;
}

NGL.prototype.createDebugObject = function(size){
	var mat = this.createMaterial();
	mat.shaderProgram = "color";
	
	var debugObject = this.createObject({
		vertices: [
			// Red (x) arrow 0-5
			-0.1, 0, 0,
			1, 0, 0,

			0.8, 0.1, 0.1,
			0.8, 0.1, -0.1,
			0.8, -0.1, -0.1,
			0.8, -0.1, 0.1,

			// Green (y) arrow 6-11
			0, -0.1, 0,
			0, 1, 0,

			0.1, 0.8, 0.1,
			0.1, 0.8, -0.1,
			-0.1, 0.8, -0.1,
			-0.1, 0.8, 0.1,

			// Blue (z) arrow 11-16
			0, 0, -0.1,
			0, 0, 1,

			0.1, 0.1, 0.8,
			0.1, -0.1, 0.8,
			-0.1, -0.1, 0.8,
			-0.1, 0.1, 0.8,
		],
		indices: [
			// Red (x) arrow
			0, 1,

			1, 2,
			2, 3,
			1, 3,
			3, 4,
			1, 4,
			4, 5,
			1, 5,
			5, 2,

			2, 4,
			5, 3,

			// Green (y) arrow
			6, 7,

			7, 8,
			8, 9,
			7, 9,
			9, 10,
			7, 10,
			10, 11,
			7, 11,
			11, 8,

			8, 10,
			11, 9,

			// Blue (z) arrow 11-16
			12, 13,

			13, 14,
			14, 15,
			13, 15,
			15, 16,
			13, 16,
			16, 17,
			13, 17,
			17, 14,

			14, 16,
			17, 15
		],
		size: -1,
		visible: true,
		colors: [
			// Red (x) arrow
			1, 0, 0, 1,
			1, 0, 0, 1,
			1, 0, 0, 1,
			1, 0, 0, 1,
			1, 0, 0, 1,
			1, 0, 0, 1,

			// Green (y) arrow 6-11
			0, 0.7, 0, 1,
			0, 0.7, 0, 1,
			0, 0.7, 0, 1,
			0, 0.7, 0, 1,
			0, 0.7, 0, 1,
			0, 0.7, 0, 1,

			// Blue (z) arrow 11-16
			0, 0, 1, 1,
			0, 0, 1, 1,		
			0, 0, 1, 1,
			0, 0, 1, 1,		
			0, 0, 1, 1,
			0, 0, 1, 1
		],
		material: mat,
		drawMode: "LINES"
	});
	
	if(size){
		debugObject.scale.x = size;
		debugObject.scale.y = size;
		debugObject.scale.z = size;
	}
	
	return debugObject;
}

NGL.prototype.init = function(){
	this.navigator = (function(){
		var ua= navigator.userAgent, tem,
		M= ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
		if(/trident/i.test(M[1])){
			tem=  /\brv[ :]+(\d+)/g.exec(ua) || [];
			return 'IE '+(tem[1] || '');
		}
		if(M[1]=== 'Chrome'){
			tem= ua.match(/\b(OPR|Edge)\/(\d+)/);
			if(tem!= null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
		}
		M= M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
		if((tem= ua.match(/version\/(\d+)/i))!= null) M.splice(1, 1, tem[1]);
		return M.join(' ');
	})();
	
	var that = this;
	window.addEventListener("keydown", function(e){
		e.preventDefault();
		
		var key = that.getCommonKeyCode(e.keyCode);
		
		that.controls.keys[key] = true;
		
		if(!that.eventPool.down[key]){
			that.eventPool.down[key] = {
				addedToPool: false
			};
			if(that.eventPool.up[key]){
				delete that.eventPool.up[key];
			}
		}
		
		return false;
	});
	
	window.addEventListener("keyup", function(e){
		e.preventDefault();
		
		var key = that.getCommonKeyCode(e.keyCode);
		
		that.controls.keys[key] = false;
		
		if(!that.eventPool.up[key]){
			that.eventPool.up[key] = {
				addedToPool: false
			};
			if(that.eventPool.down[key]){
				delete that.eventPool.down[key];
			}
		}
		
		if(key === that.fullscreenKey){
			if(document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement){
				document.cancelFullScreen();
			}else{
				this.canvas.requestFullScreen();
			}
		}
		
		return false;
	});
	
	this.canvas.addEventListener("mousemove", function(e){
		that.eventPool.mouse.movement.x += e.movementX || e.mozMovementX ||e.webkitMovementX || 0;
		that.eventPool.mouse.movement.y += e.movementY || e.mozMovementY ||e.webkitMovementY || 0;
	});
	
	this.canvas.addEventListener("mousedown", function(e){
		e.preventDefault();
		
		that.canvas.requestPointerLock();
		
		that.eventPool.mouse.down.push(e.button);
	});
	
	this.canvas.addEventListener("mouseup", function(e){
		e.preventDefault();
		
		that.eventPool.mouse.up.push(e.button);
	});
	
	NGL.loadFiles(["shaders/material.vs", "shaders/material.fs",
				   "shaders/color.vs", "shaders/color.fs",
				   "shaders/font.vs", "shaders/font.fs",
				   "shaders/skybox.vs", "shaders/skybox.fs",
				   "shaders/terrain.vs", "shaders/terrain.fs"], "text", function(sources){
		that.programs.material = that.createShaderProgram(sources[0], sources[1]);
		
		that.programs.material.addAttribute(that.gl, "vertexPosition");
		that.programs.material.addAttribute(that.gl, "vertexTextureCoords");
		that.programs.material.addAttribute(that.gl, "vertexNormal");
		
		that.programs.material.addUniform(that.gl, "pvm");
		that.programs.material.addUniform(that.gl, "normalMatrix");
		
		that.programs.material.addUniform(that.gl, "diffuseTexture");
		that.programs.material.addUniform(that.gl, "normalTexture");
		that.programs.material.addUniform(that.gl, "specularTexture");
		
		that.programs.material.addUniform(that.gl, "skybox");
		
		that.programs.material.addUniform(that.gl, "hasDiffuseTexture");
		that.programs.material.addUniform(that.gl, "hasNormalTexture");
		that.programs.material.addUniform(that.gl, "hasSpecularTexture");
		
		that.programs.material.addUniform(that.gl, "hasSkybox");
		
		that.programs.material.addUniform(that.gl, "color");
		that.programs.material.addUniform(that.gl, "lightDirection");
		that.programs.material.addUniform(that.gl, "cameraPosition");
		
		that.programs.material.addUniform(that.gl, "hardness");
		that.programs.material.addUniform(that.gl, "shiness");
		that.programs.material.addUniform(that.gl, "reflectivity");
		
		that.programs.material.addUniform(that.gl, "shadeless");
		
		that.programs.color = that.createShaderProgram(sources[2], sources[3]);
		
		that.programs.color.addAttribute(that.gl, "vertexPosition");
		that.programs.color.addAttribute(that.gl, "vertexColor");
		
		that.programs.color.addUniform(that.gl, "pvm");
		
		that.programs.font = that.createShaderProgram(sources[4], sources[5]);
		
		that.programs.font.addAttribute(that.gl, "vertexPosition");
		that.programs.font.addAttribute(that.gl, "vertexTextureCoords");
		
		that.programs.font.addUniform(that.gl, "fontTexture");
		that.programs.font.addUniform(that.gl, "hasFontTexture");
		
		that.programs.font.addUniform(that.gl, "color");
		that.programs.font.addUniform(that.gl, "charWidth");
		that.programs.font.addUniform(that.gl, "glowness");
		
		that.programs.font.addUniform(that.gl, "pvm");
		
		that.programs.skybox = that.createShaderProgram(sources[6], sources[7]);
		
		that.programs.skybox.addAttribute(that.gl, "vertexPosition");
		
		that.programs.skybox.addUniform(that.gl, "cubemap");
		that.programs.skybox.addUniform(that.gl, "skycolor");
		
		that.programs.skybox.addUniform(that.gl, "pvFixed");
		
		that.programs.terrain = that.createShaderProgram(sources[8], sources[9]);
		
		that.programs.terrain.addAttribute(that.gl, "vertexPosition");
		that.programs.terrain.addAttribute(that.gl, "vertexTextureCoords");
		that.programs.terrain.addAttribute(that.gl, "vertexNormal");
		
		that.programs.terrain.addUniform(that.gl, "pvm");
		that.programs.terrain.addUniform(that.gl, "normalMatrix");
		
		that.programs.terrain.addUniform(that.gl, "color");
		that.programs.terrain.addUniform(that.gl, "lightDirection");
		
		that.programs.terrain.addUniform(that.gl, "shadeless");
		
		that.onready();
	});
}

// Static fields
NGL.loadFile = function(file, type, callback, thisArg){
	thisArg = thisArg || this;
	
	var xhr = new XMLHttpRequest();
	xhr.open('GET', file, true);
	xhr.responseType = type;
	xhr.onload = function(){
		if(xhr.status === 200){
			callback.call(thisArg, xhr.response);
		}else{
			throw new Error("XMLHttpRequest to "+file+" failed: "+xhr.status+" "+xhr.statusText);
		}
	}
	xhr.onprogress = function(e){
		console.log("Loading "+file+": "+(Math.floor((e.loaded/e.total)*100))+"%");
	}
	xhr.send();
}

NGL.loadImage = function(src, callback, thisArg){
	thisArg = thisArg || this;
	
	var img = new Image();
	img.onprogress = function(e){
		console.log("Loading "+file+": "+(Math.floor((e.loaded/e.total)*100))+"%");
	}
	img.onload = function(){
		callback.call(thisArg, img);
	};
	img.src = src;
}

NGL.loadFiles = function(files, types, callback, thisArg){
	thisArg = thisArg || this;
	
	var loaded = 0;
	var loadedData = [];
	
	if(typeof types === "string"){
		var allTypes = types;
		types = Array(files.length);
		for(var i = 0; i < types.length; i++){
			types[i] = allTypes;
		}
	}
	
	files.forEach(function(file, index, all){
		NGL.loadFile(file, types[index], function(data){
			loaded++;
			loadedData[index] = data;
			
			if(loaded === all.length){
				callback.call(thisArg, loadedData);
			}
		});
	});
}

NGL.loadImages = function(files, callback, thisArg){
	thisArg = thisArg || this;
	
	var loaded = 0;
	var loadedImgs = [];
	
	files.forEach(function(file, index, all){
		NGL.loadImage(file, function(img){
			loaded++;
			loadedImgs[index] = img;
			
			if(loaded === all.length){
				callback.call(thisArg, loadedImgs);
			}
		});
	});
}

NGL.readPixels = function(img){
	var canvas = document.createElement("canvas");
	canvas.width = img.width;
	canvas.height = img.height;
	
	var gtx = canvas.getContext("2d");
	
	gtx.drawImage(img, 0, 0);
	
	return gtx.getImageData(0, 0, img.width, img.height).data;
}

NGL.toRadians = function(degree){
	return degree * Math.PI / 180;
}

NGL.toDegrees = function(radian){
	return radian * 180 / Math.PI;
}

NGL.color = function(max, r, g, b, a){
	if(typeof max === "string"){
		var formatted = max;
		
		while(formatted.indexOf(" ") !== -1){
			formatted = formatted.replace(" ", "");
		}
		
		while(formatted.indexOf("\t") !== -1){
			formatted = formatted.replace("\t", "");
		}
		
		while(formatted.indexOf("\n") !== -1){
			formatted = formatted.replace("\n", "");
		}
		
		if(formatted.startsWith("#")){
			formatted = formatted.substr(1, formatted.length);
			
			if(formatted.length === 3){
				var r = parseInt(formatted[0], 16) || 0;
				var g = parseInt(formatted[1], 16) || 0;
				var b = parseInt(formatted[2], 16) || 0;

				return [r/16, g/16, b/16, 1];
			}else if(formatted.length === 6){
				var r = parseInt(formatted.substr(0, 2), 16) || 0;
				var g = parseInt(formatted.substr(2, 2), 16) || 0;
				var b = parseInt(formatted.substr(4, 2), 16) || 0;

				return [r/255, g/255, b/255, 1];
			}else{
				return [0, 0, 0, 1];
			}
		}
	}else{
		max = (typeof max === "number" ? (max <= 0 ? 1 : max) : 1);
		r = r || 0;
		g = g || 0;
		b = b || 0;
		a = (typeof a === "number" ? a : 1);

		return [r/max, g/max, b/max, a/max];
	}
}

NGL.keyCodes = {
	zero: 48,
	one: 49,
	two: 50,
	three: 51,
	four: 52,
	five: 53,
	six: 54,
	seven: 55,
	eight: 56,
	nine: 57,
	
	break: 3,
	backspace: 8,
	tab: 9,
	clear: 12,
	enter: 13,
	shift: 16,
	ctrl: 17,
	alt: 18,
	pause: 19,
	capsLock: 20,
	escape: 27,
	spacebar: 32,
	pageUp: 33,
	pageDown: 34,
	end: 35,
	home: 36,
	left: 37,
	up: 38,
	right: 39,
	down: 40,
	select: 41,
	print: 42,
	execute: 43,
	printScreen: 44,
	insert : 45,
	delete: 46,
	
	a: 65,
	b: 66,
	c: 67,
	d: 68,
	e: 69,
	f: 70,
	g: 71,
	h: 72,
	i: 73,
	j: 74,
	k: 75,
	l: 76,
	m: 77,
	n: 78,
	o: 79,
	p: 80,
	q: 81,
	r: 82,
	s: 83,
	t: 84,
	u: 85,
	v: 86,
	w: 87,
	x: 88,
	y: 89,
	z: 90,
	
	numpadZero : 96,
	numpadOne : 97,
	numpadTwo : 98,
	numpadThree : 99,
	numpadFour : 100,
	numpadFive : 101,
	numpadSix : 102,
	numpadSeven : 103,
	numpadEight : 104,
	numpadNine : 105,
	multiply : 106,
	add: 107,
	subtract : 109,
	decimalPoint: 110,
	divide : 111,
	
	f1 : 112,
	f2 : 113,
	f3 : 114,
	f4 : 115,
	f5 : 116,
	f6 : 117,
	f7 : 118,
	f8 : 119,
	f9 : 120,
	f10: 121,
	f11: 122,
	f12: 123,
	f13: 124,
	f14: 125,
	f15: 126,
	f16: 127,
	f17: 128,
	f18: 129,
	f19: 130,
	
	numLock : 144,
	scrollLock: 145,
	mute: 173,
	decreaseVolume: 174,
	increaseVolume: 175,
	semiColon : 186,
	equalSign : 187,
	comma: 188,
	dash : 189,
	period : 190,
	forwardSlash: 191,
	graveAccent : 192,
	openBracket : 219,
	backSlash : 220,
	closeBracket : 221,
	singleQuote : 222,
	altgr: 225,
	toggleTouchpad: 255,
};

NGL.objectTypes = {
	TERRAIN: "TERRAIN",
	TEXTURE: "TEXTURE",
	SKYBOX: "SKYBOX",
	MESHOBJECT: "MESHOBJECT",
	FONT: "FONT",
	MATERIAL: "MATERIAL",
	CAMERA: "CAMERA",
	SCENE: "SCENE",
	TEXTOBJECT: "TEXTOBJECT",
	SHADERPROGRAM: "SHADERPROGRAM",
	MATERIALMAP: "MATERIALMAP",
	HEIGHTMAP: "HEIGHTMAP"
};
