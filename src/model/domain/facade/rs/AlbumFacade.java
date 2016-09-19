package model.domain.facade.rs;

import java.net.URL;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import com.google.gdata.data.photos.AlbumEntry;
import com.google.gdata.data.photos.UserFeed;

import controller.ConexaoController;
import model.domain.Album;

@Path("/albuns")
@Produces(MediaType.APPLICATION_JSON)
public class AlbumFacade {

	ConexaoController conexao = new ConexaoController();
	
	@GET
	public String retornarTodosAlbuns(){
		
		String listaAlbunsJson = "";
		
    	try {
    		
        	URL feedUrl = new URL("https://picasaweb.google.com/data/feed/api/user/dfamiliajp?kind=album");
    		
    		UserFeed myUserFeed = conexao.retornaServico().getFeed(feedUrl, UserFeed.class);
	        
    		listaAlbunsJson = "[";
    		
	        for(AlbumEntry myAlbum : myUserFeed.getAlbumEntries()){
	        	if(myAlbum.getAccess().equalsIgnoreCase("protected")){
	        		listaAlbunsJson += new Album(
		        			myAlbum.getName(), 
		        			myAlbum.getTitle().getPlainText(), 
		        			myAlbum.getMediaThumbnails().get(0).getUrl()).retornaJson() + ","; 
		        }
	        }
	        
	        listaAlbunsJson = listaAlbunsJson.substring(0, listaAlbunsJson.length() - 1) + "]";
	            
    	} catch (Exception e) {
			e.printStackTrace();
		}
    	
		return listaAlbunsJson;
	}
	
}