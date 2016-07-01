function getCount() {

var conn = $.db.getConnection();

var state = $.request.parameters.get("stateID");

// SELECT count(1) FROM \"p1891766442trial.hanadb.hihana.hana::customertable\" WHERE \"STATECODE\" = ?

 var statement = 'SELECT count(1) FROM \"waysidecloudapp.dbtables::customertable\" WHERE \"STATECODE\" = ?';

$.response.contentType="application/json";

try{

var pstmt = conn.prepareStatement(statement);

    pstmt.setString(1,state);

var result = pstmt.executeQuery();

if(result.next()){



var oResult = '{"count":' + '"' + result.getInteger(1) + '"}';      

$.response.setBody(oResult);



$.response.status = $.net.http.OK;



}

} catch (ex) {

       $.response.setBody(ex.toString());



} finally{

       if (conn) {

              conn.close();

       }

}



}

getCount(); 