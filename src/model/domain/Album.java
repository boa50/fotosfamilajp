package model.domain;

import java.io.Serializable;

public class Album implements Serializable {

	private static final long serialVersionUID = 1L;

	private final String ALBUM_URL_BASE = "https://picasaweb.google.com/data/feed/base/user/dfamiliajp/albumid/";

	
	private String id;
	
	private String nome;
	
	private String urlImagemCapa;

	
	public Album(String id, String nome, String urlImagemCapa){
		super();
		this.id = id;
		this.nome = nome;
		this.urlImagemCapa = urlImagemCapa;
	}
	
	public String retornaLink(){
		return this.ALBUM_URL_BASE + this.id;
	}
	
	public String retornaJson(){
		return "{\"id\": \"" + this.id + "\","
				+ "\"nome\": \"" + this.nome + "\","
				+ "\"urlImagemCapa\": \"" + this.urlImagemCapa + "\","
				+ "\"link\": \"" + retornaLink() + "\"}";
	}

}
