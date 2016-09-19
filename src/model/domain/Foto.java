package model.domain;

import java.io.Serializable;

public class Foto implements Serializable {

	private static final long serialVersionUID = 1L;

	
	private String id;
	
	private String urlImagem;
	
	private String urlThumbnail;
	
	private boolean ajustarThumbnail;

	
	public Foto(String id, String urlImagem, String urlThumbnail, boolean ajustarThumbnail){
		super();
		this.id = id;
		this.urlImagem = urlImagem;
		this.urlThumbnail = urlThumbnail;
		this.ajustarThumbnail = ajustarThumbnail;
	}
	
	public String retornaJson(){
		return "{\"id\": \"" + this.id + "\","
				+ "\"urlImagem\": \"" + this.urlImagem + "\","
				+ "\"urlThumbnail\": \"" + this.urlThumbnail + "\","
				+ "\"ajustarThumbnail\": \"" + this.ajustarThumbnail + "\"}";
	}
	
}
