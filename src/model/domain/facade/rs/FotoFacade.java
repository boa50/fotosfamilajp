package model.domain.facade.rs;

import java.net.URL;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import com.google.gdata.client.photos.PicasawebService;
import com.google.gdata.data.photos.AlbumFeed;
import com.google.gdata.data.photos.PhotoEntry;

import controller.ConexaoController;
import model.domain.Foto;

@Path("/fotos/{albumId}")
@Produces(MediaType.APPLICATION_JSON)
public class FotoFacade {

	ConexaoController conexao = new ConexaoController();

	@GET
	public String retornarTodosAlbuns(@PathParam("albumId") String albumId) {

		PicasawebService myService = conexao.retornaServico();

		String listaFotosJson = "";
		
		boolean ajustarThumbnail = false;

		try {

			URL feedUrl = new URL(
					"https://picasaweb.google.com/data/feed/base/user/dfamiliajp/albumid/" + albumId + "?kind=photo");

			AlbumFeed feed = myService.getFeed(feedUrl, AlbumFeed.class);

			listaFotosJson = "[";

			for (PhotoEntry photo : feed.getPhotoEntries()) {
				ajustarThumbnail = false;
				
				if(photo.getMediaThumbnails().get(0).getWidth() > photo.getMediaThumbnails().get(0).getHeight())
					ajustarThumbnail = true;
				
				listaFotosJson += new Foto(photo.getId(),
						photo.getMediaContents().get(0).getUrl(),
						photo.getMediaThumbnails().get(2).getUrl(),
						ajustarThumbnail).retornaJson() + ",";
				
			}
			
			listaFotosJson = listaFotosJson.substring(0, listaFotosJson.length() - 1) + "]";

		} catch (Exception e) {
			e.printStackTrace();
		}

		return listaFotosJson;
	}
}
