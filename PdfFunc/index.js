var pdf = require('html-pdf');


module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
    const html=req.body.data;
    var data = await returnHtmlAsPdf(html);
    var data2 = []
    data2.push(data);
    context.res = {
        setEncoding: 'binary',
        // status: 200, /* Defaults to 200 */
        body: Buffer.concat(data2)
    };
    context.done();
};

async function returnHtmlAsPdf(html) {
    return new Promise((resolve, reject) => {
        pdf.create(html).toBuffer(function(err, buffer){
            if(err){
                reject(err);
            }
            resolve(buffer);
        })
    });
    
}
