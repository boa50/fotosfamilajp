package model.domain.facade.rs;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import model.domain.Login;

@Path("/login/{login}/{senha}")
@Produces(MediaType.APPLICATION_JSON)
public class LoginFacade {
	
	private Login login = new Login();
	
	@GET
	public String retornarChaveAcesso(
			@PathParam("login") String loginCliente, 
			@PathParam("senha") String senhaCliente){
		
		if(login.verificarAcesso(loginCliente, senhaCliente))
			return login.gerarChaveAcesso(senhaCliente);
		
		return "{\"acesso\": \"\"}";
		
	}
	
}
