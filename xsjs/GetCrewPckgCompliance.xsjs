
getDataFromTable();
function getDataFromTable(){
    var conn = $.db.getConnection();
    var pstmt;
    var rs;
    var query;
    var output = {results: [] };
    try {
        
      //  query = 'SELECT \"StationId\",count(*) FROM \"p1891766442trial.hanadb.hihana.hana::CrewPackageData\" GROUP BY \"StationId\"';
       // query = 'SELECT \"CrewPackageId\",CASE WHEN COUNT(*) > 0 AND COUNT(*) < 100	THEN \"YELLOW\" WHEN COUNT(*) > 100 AND COUNT(*) < 200	THEN \"GREEN\" ELSE 'RED'	END AS \"STATUS\" FROM "NEO_6JPBVD37WSX2QT1FE2YGPB0KX"."p1891766442trial.hanadb.hihana.hana::CrewPackageData" GROUP BY \"CrewPackageId\";
       
     query =    'SELECT "CrewPackageId",CASE WHEN COUNT(*) > 0 AND COUNT(*) < 100	THEN \'YELLOW\''+
		        'WHEN COUNT(*) > 100 AND COUNT(*) < 200	THEN \'GREEN\''+
		        'ELSE \'RED\''+
	            'END AS \"STATUS\"'+
                'FROM'+ 
                '\"waysidecloudapp.dbtables::CrewPackageData\"'+ 
                'GROUP BY'+ 
                '\"CrewPackageId\"';
        pstmt = conn.prepareStatement(query);
        //pstmt.setString(1, Station_ID);
        rs = pstmt.executeQuery();

        var record = {};
        while (rs.next()) {
        record.StationId  = rs.getString(1);
        record.StationCount    = rs.getString(2);
            /*record.OrderId          = rs.getString(3);
            
            record.OrderType            = rs.getString(4);
        	record.OrderDescription     = rs.getString(5);
            record.StartDate            = rs.getString(6);
            
            record.EstimatedTime  = rs.getString(7);
        	record.CrewName    = rs.getString(8);
            record.CrewMemberNames          = rs.getString(9);
            
            record.Status  = rs.getString(10);
        	record.StationId    = rs.getString(11);
            record.TrainId          = rs.getString(12);
            
            record.LocoId  = rs.getString(13);
        	record.Location    = rs.getString(14);
            record.PercentageCompletion          = rs.getString(15);
            
            record.TotalCrewMembers  = rs.getString(16);*/
        	output.results.push(record);
        }
        rs.close();
        pstmt.close();
        conn.close();
	} catch (e) {
		$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
        $.response.setBody(e.message);
        return;
	}
	var body = JSON.stringify(output);
    $.response.contentType = 'application/json';
    $.response.setBody(body);
    $.response.status = $.net.http.OK;
} 
