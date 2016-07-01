var aCmd = $.request.parameters.get('cmd');
switch (aCmd)
{
    case "select":
        getDataFromTable();
        break;
    case "insert":
    	insertDataIntoTable();
        break;
    case "delete":
    	deleteDataFromTable();
        break;    
    default:
        $.response.status = $.net.http.INTERNAL_SERVER_ERROR;
        $.response.setBody('Invalid Command: ', aCmd);
}
function getDataFromTable(){
    var conn = $.db.getConnection();
    var pstmt;
    var rs;
    var output = {results: [] };
    try {
     pstmt = conn.prepareStatement("SELECT * FROM \"waysidecloudapp.dbtables::CrewPackageData\"");

        rs = pstmt.executeQuery();

        var record = {};
        while (rs.next()) {
        	record.CrewPackageName  = rs.getString(1);
        	record.CrewPackageId    = rs.getString(2);
            record.OrderId          = rs.getString(3);
            
            record.OrderType  = rs.getString(4);
        	record.OrderDescription    = rs.getString(5);
            record.StartDate          = rs.getString(6);
            
            record.EstimatedTime  = rs.getString(7);
        	record.CrewName    = rs.getString(8);
            record.CrewMemberNames          = rs.getString(9);
            
            record.Status  = rs.getString(10);
        	record.StationId    = rs.getString(11);
            record.TrainId          = rs.getString(12);
            
            record.LocoId  = rs.getString(13);
        	record.Location    = rs.getString(14);
            record.PercentageCompletion          = rs.getString(15);
            
            record.TotalCrewMembers  = rs.getString(16);

            
            
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
function insertDataIntoTable(){


    var CrewPackageName     = $.request.parameters.get('CrewPackageName');
    var CrewPackageId       = $.request.parameters.get('CrewPackageId');
    var OrderId             = $.request.parameters.get('OrderId');
    
    var OrderType           = $.request.parameters.get('OrderType');
    var OrderDescription    = $.request.parameters.get('OrderDescription');
    var StartDate            = $.request.parameters.get('StartDate');
    
    var EstimatedTime              = $.request.parameters.get('EstimatedTime');
    var CrewName           = $.request.parameters.get('CrewName');
    var CrewMemberNames             = $.request.parameters.get('CrewMemberNames');
   
    var Status              = $.request.parameters.get('Status');
    var StationId            = $.request.parameters.get('StationId');
    var TrainId= $.request.parameters.get('TrainId');
    
     var LocoId             = $.request.parameters.get('LocoId');
    var Location            = $.request.parameters.get('Location');
    var PercentageCompletion= $.request.parameters.get('PercentageCompletion');
   
    var TotalCrewMembers    = $.request.parameters.get('TotalCrewMembers');
   
   
  
    var conn = $.db.getConnection();
    var pstmt;
    var query;
    var rs;
    try {
    	query = 'INSERT INTO \"waysidecloudapp.dbtables::CrewPackageData\" VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
     
        pstmt = conn.prepareStatement(query);
 

        pstmt.setString(1, CrewPackageName);
        pstmt.setString(2, CrewPackageId);
        pstmt.setString(3, OrderId);
        
        pstmt.setString(4, OrderType);
        pstmt.setString(5, OrderDescription);
        pstmt.setString(6, StartDate);
        
        pstmt.setString(7, EstimatedTime);
        pstmt.setString(8, CrewName);
        pstmt.setString(9, CrewMemberNames);
        
        pstmt.setString(10, Status);
        pstmt.setString(11, StationId);
        pstmt.setString(12, TrainId);
        
        pstmt.setString(13, LocoId);
        pstmt.setString(14, Location);
        pstmt.setString(15, PercentageCompletion);
        
        pstmt.setString(16, TotalCrewMembers);
        
        
       

        rs = pstmt.executeUpdate();
        conn.commit();
        pstmt.close();
        conn.close();
	} catch (e) {
		$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
        $.response.setBody(e.message);
        return;
	}
    $.response.contentType = 'application/json';
    $.response.setBody(rs + ' Record Inserted successfully');
    $.response.status = $.net.http.OK;
} 
function deleteDataFromTable(){
    var productId = $.request.parameters.get('product_id');
    var conn = $.db.getConnection();
    var pstmt;
    var query;
    try {
    	query = 'DELETE FROM \"p1940454979trial.hanaxs.hello::PRODUCT\" WHERE product_id = ?';
        pstmt = conn.prepareStatement(query);
        pstmt.setString(1, productId);
        pstmt.executeUpdate();
        conn.commit();

        pstmt.close();
        conn.close();
	} catch (e) {
		$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
        $.response.setBody(e.message);
        return;
	}
    $.response.contentType = 'application/json';
    $.response.setBody('Record deleted successfully');
    $.response.status = $.net.http.OK;
} 
//https://s11hanaxs.hanatrial.ondemand.com/p1891766442trial/hanadb/hihana/hana/DataManipulationCrewPackageData.xsjs?cmd=insert&CrewPackageName=CrewPackageName&CrewPackageId=CrewPackageId&OrderId=OrderId&OrderType=OrderType&OrderDescription=OrderDescription&StartDate=StartDate&EstimatedTime=EstimatedTime&CrewName=CrewName&CrewMemberNames=CrewMemberNames&Status=Status&StationId=StationId&TrainId=TrainId&LocoId=LocoId&Location=Location&PercentageCompletion=PercentageCompletion&TotalCrewMembers=TotalCrewMembers