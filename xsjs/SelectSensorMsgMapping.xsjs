    var conn = $.db.getConnection();
    var pstmt;
    var rs;
    var output = {results: [] };
    try 
    {
        pstmt = conn.prepareStatement("SELECT * FROM \"waysidecloudapp.dbtables::InboundMessageDetails\"");
        rs = pstmt.executeQuery();
        var record = {};
        while (rs.next()) 
        {
        	record.productId = rs.getString(1);
        	record.productName = rs.getString(2);
        	output.results.push(record);
        }
        rs.close();
        pstmt.close();
        conn.close();
	} 
	catch (e) 
	{
		$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
        $.response.setBody(e.message);
       // return;
	}
	
	var body = JSON.stringify(output);
    $.response.contentType = 'application/json';
    $.response.setBody(body);
    $.response.status = $.net.http.OK;