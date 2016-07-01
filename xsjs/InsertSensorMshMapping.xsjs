   function insertDataIntoTable()
   {
    var MSG_TYPE    = $.request.parameters.get('MSG_TYPE');
    var MSG_NAME    = $.request.parameters.get('MSG_NAME');
    var MSG_ID      = $.request.parameters.get('MSG_ID');
    $.response.setContentType("text/plain");  
    $.response.addBody("MSG_TYPE");  
    
    //var MSG_TRANS_ID      = $.request.parameters.get('MSG_TRANS_ID');
    //var MSG_QUEUE         = $.request.parameters.get('MSG_QUEUE');
    //var MSG_QUEUE_SEQ     = $.request.parameters.get('MSG_QUEUE_SEQ');
    
    //var MSG_DOC           = $.request.parameters.get('MSG_DOC');
    //var MSG_PROC_STATUS   = $.request.parameters.get('MSG_PROC_STATUS');
    //var MSG_RECV_TIME     = $.request.parameters.get('MSG_RECV_TIME');
    
    //var MSG_PROC_TIME     = $.request.parameters.get('MSG_PROC_TIME');
    //var MSG_SRC           = $.request.parameters.get('MSG_SRC');

    var conn = $.db.getConnection();
    var pstmt;
    var query;
    var rs;
    try 
    {
    	query = 'INSERT INTO \"waysidecloudapp.dbtables::InboundMessageDetails\" VALUES (?,?,?)';
        pstmt = conn.prepareStatement(query);
        pstmt.setString(1, "MSG_TYPE");
        pstmt.setString(2, "MSG_NAME");
        pstmt.setString(3, "MSG_ID");
        
        //pstmt.setString(4, "MSG_TRANS_ID");
        //pstmt.setString(5, "MSG_QUEUE");
        //pstmt.setString(6, "MSG_QUEUE_SEQ");
        
        //pstmt.setString(7, "MSG_DOC");
        //pstmt.setString(8, "MSG_PROC_STATUS");
        //pstmt.setString(9, "MSG_RECV_TIME");
        
        //pstmt.setString(10, "MSG_PROC_TIME");
        //pstmt.setString(11, "MSG_SRC");
        
        rs = pstmt.executeUpdate();
        conn.commit();
        pstmt.close();
        conn.close();
       
	} 
	catch (e) 
	{
		$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
        $.response.setBody(e.message);
        //return;
	}
    $.response.contentType = 'application/json';
    $.response.setBody(rs + ' Record Inserted successfully');
    $.response.status = $.net.http.OK;
    
    }