package model.domain;

import java.io.InputStream;
import java.util.Properties;

public class Login {

	Properties codigos = new Properties();
	InputStream input;
	
	String login = "";
	String senha = "";
	
	public Login(){
		try {
			this.input = this.getClass().getClassLoader().getResourceAsStream("codigos.properties");
			this.codigos.load(this.input);
			
			this.login = this.codigos.getProperty("login");
			this.senha = this.codigos.getProperty("senha");
			
			this.input.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	public boolean verificarAcesso(String loginCliente, String senhaCliente){
		this.login = loginCliente;
		
		if(loginCliente.equals(this.login) && senhaCliente.equals(this.senha))
			return true;
		
		return false;
	}
	
	public String gerarChaveAcesso(String senhaCliente){
		return "{\"acesso\": \"" + senhaCliente + "\"}";
	}
	
}
