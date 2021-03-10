const fs = require('fs');
const path = require('path');


function main(){
    let filename = path.join(__dirname, 'client', 'src', 'config', 'index.js');
    fs.readFile(filename, 'utf8', function(err, data){
        if(err){
            console.error('ERROR: ', err);
        }else{
            let lines = data.split('\n');

            if(lines[1].startsWith('//')){
                lines[1] = lines[1].substr(3, );
            }

            if(!lines[2].startsWith('//')){
                lines[2] = '// ' + lines[2];
            }
            if(!lines[3].startsWith('//')){
                lines[3] = '// ' + lines[3];
            }

            if(!lines[4].startsWith('//')){
                lines[4] = '// ' + lines[4];
            }

            let newData = lines.join('\n');

            fs.writeFile(filename, newData, function(err){
                if(err){
                    console.error('ERROR: ', err);
                }else{
                    console.log('Successfully written over client config file.');
                }
            });
        }
    });
}

main();