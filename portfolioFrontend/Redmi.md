deployment

step 1 :"always be on main branch,npm run build , npm run deploy "

 before deploye just check wheather files are deleted or not 
 if files are deleted just revert (undo ) the files and after revert it will not show in changes,
 now 
 after the development first push the code  and then
run => npm run build 
and the run this command  " cp dist/index.html dist/404.html "
<!-- note in your dist/ folder after building (npm run build), just copy your index.html as 404.html:

it will copy with the help of this command "" cp dist/index.html dist/404.html "" -->

now after the build command  and before the deployment command just check the 404.html file is available or not
if this  file is not there then ,when you change the route and refrece the page it will show to not founf page


 