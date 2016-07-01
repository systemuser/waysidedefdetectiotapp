//    var UserName    = $.request.parameters.get('UserName');
    var conn = $.db.getConnection();
    var pstmt;
    var rs;
    var query;
    var output = {results: [] };
    try {
        query = 'SELECT \"Region\" FROM \"waysidecloudapp.dbtables::UserConfigData\"';
        pstmt = conn.prepareStatement(query);
       // pstmt.setString(1, UserName);
        rs = pstmt.executeQuery();

        var record = {};
        while (rs.next()) {
        record.Region  = rs.getString(1);
       // record.StationId    = rs.getString(2);
        	output.results.push(record);
        }
        rs.close();
        pstmt.close();
        conn.close();
	} catch (e) {
		$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
        $.response.setBody(e.message);
	}
	var body = JSON.stringify(output);
    $.response.contentType = 'application/json';
    $.response.setBody(body);
    $.response.status = $.net.http.OK;