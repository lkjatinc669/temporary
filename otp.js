function out(d){console.log(d)}

async function verifygenerateCracks(usrID) {
    const unqid= generator(20)
    const verifyGenToken = generator(40)
    x = genOTP()
    otp = x[0], hash = x[1]

    QUERY = `SELECT userID FROM verifytable where userID = '${usrID}'`;

    await connection.query(QUERY)
        .then(data=>{
            out(data[0].length)
            if (data[0].length == 0){
                // insert
                async function run() {
                    out("inserting")
                    const a = await otpInsert(unqid, usrID, verifyGenToken, hash)
                    out("returning Insert")
                    return await a
                }
                run()
            } else {
                // update 
                async function run() {
                    out("updating")
                    const a = await optUpdate(usrID, verifyGenToken, hash)
                    out("returning Update")
                    return await a
                }
                run()
            }
        })
        .catch(error=>console.log(error))
}

async function optUpdate(userID, verifierToken, hash){
    QUERY = `UPDATE verifytable SET 
    verifierToken='${verifierToken}',otpHash='${hash}',time=CURRENT_TIMESTAMP 
    WHERE userID='${userID}'`

    const [yy] = await connection.query(QUERY)
        .catch(error=>console.log(error))

        out( "Function => "+ await yy['affectedRows'])
    return await yy['affectedRows']
    // data = await yy
    // out( await data['affectedRows'])
}

async function otpInsert(unqid, userID, verifierToken, hash){
    QUERY = `INSERT INTO verifytable (unqID, userID, verifierToken, otpHash, time) 
    VALUES ('${unqid}', '${userID}', '${verifierToken}', '${hash}', CURRENT_TIMESTAMP)`

    const [yy] = await connection.query(QUERY)
        .catch(error=>console.log(error))

    out( "Function => "+ await yy['affectedRows'])
    return await yy['affectedRows']
}

var result = await verifygenerateCracks("aa")
console.log("Final Value => " + await result)
