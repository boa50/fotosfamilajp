package controller;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Properties;

import com.google.api.client.googleapis.auth.oauth2.GoogleCredential;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.jackson.JacksonFactory;
import com.google.gdata.client.photos.PicasawebService;
import com.google.gson.JsonObject;

public class ConexaoController {
	
	private Properties codigos;
	private InputStream input;
	
	private String clientId;
	private String clientSecret;
	private String refreshToken;
	
	private PicasawebService myService;
	
	public ConexaoController(){
		super();
		this.codigos = new Properties();
		try {
			this.input = this.getClass().getClassLoader().getResourceAsStream("codigos.properties");
			codigos.load(input);
			
			this.clientId = codigos.getProperty("clientId");
			this.clientSecret = codigos.getProperty("clientSecret");
			this.refreshToken = codigos.getProperty("refreshToken");
			
			input.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		this.myService = new PicasawebService("FotosFamiliaJP");
	}
	
	public PicasawebService retornaServico(){
		try {
			URL url = new URL("https://www.googleapis.com/oauth2/v4/token");
        	HttpURLConnection connection = (HttpURLConnection) url.openConnection();
        	connection.setRequestMethod("POST");
        	connection.setRequestProperty("Content-type", "application/x-www-form-urlencoded");
        	String urlParameters = "client_id=" + clientId + "&" +
        	         "client_secret=" + clientSecret + "&" +
        	         "refresh_token=" + refreshToken + "&" +
        	         "grant_type=refresh_token";
        	connection.setDoOutput(true);
        	DataOutputStream wr = new DataOutputStream(connection.getOutputStream());
        	wr.writeBytes(urlParameters);
        	wr.flush();
        	wr.close();
        	BufferedReader in = new BufferedReader(new InputStreamReader(connection.getInputStream()));
        	String inputLine;
        	StringBuffer res = new StringBuffer();
        	while((inputLine = in.readLine()) != null){
        		res.append(inputLine);
        	}
        	in.close();
        	
        	JsonObject json = new com.google.gson.JsonParser().parse(res.toString()).getAsJsonObject();
    	
	    	GoogleCredential credential = new GoogleCredential.Builder().setTransport(new NetHttpTransport())
	    			.setJsonFactory(new JacksonFactory())
	    			.setClientSecrets(clientId, clientSecret)
	    			.build()
	    			.setAccessToken(json.get("access_token").toString());
	    	
			myService.setOAuth2Credentials(credential);
			
			return myService;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
}
