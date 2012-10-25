var app = new function () {
	var scene, camera, renderer, ctx, triangles = {};
	var MESH_CUBE, MESH_TRIANGLE, M_CUBE = new THREE.LineBasicMaterial({ color: 0, width: 2 });
	var POINT1, POINT2, POINT3;
	var G_POINT = new THREE.SphereGeometry(3, 6, 6);
	var M_RIGHT = new THREE.MeshBasicMaterial({ color: 0xffbb00, opacity: 0.5 }),
		M_EQUIL = new THREE.MeshBasicMaterial({ color: 0xff7fff, opacity: 0.5 }),
		M_POINT = new THREE.MeshBasicMaterial({ color: 0xff0000 });
	
	var C_P = 0;
	
	var vs = [
		new THREE.Vector3(-32, -32, -32), // 0
		new THREE.Vector3( 32, -32, -32), // 1
		new THREE.Vector3( 32,  32, -32), // 2
		new THREE.Vector3(-32,  32, -32), // 3
		new THREE.Vector3(-32, -32,  32), // 4
		new THREE.Vector3( 32, -32,  32), // 5
		new THREE.Vector3( 32,  32,  32), // 6
		new THREE.Vector3(-32,  32,  32)  // 7
	];
	
	this.drawCube = function (triangle, triangleMaterial) {
		scene.remove(MESH_CUBE);
		MESH_CUBE = new THREE.Object3D;
		MESH_CUBE.rotation.y = Math.PI / 4.3;
		
		var G_LINES1 = new THREE.Geometry;
		G_LINES1.vertices = [
			vs[0], vs[1], vs[2], vs[3],
			vs[0],
			vs[4], vs[5], vs[6], vs[7],
			vs[4]
		];
		
		var G_LINES2 = new THREE.Geometry;
		G_LINES2.vertices = [ vs[3], vs[7] ];
		
		var G_LINES3 = new THREE.Geometry;
		G_LINES3.vertices = [ vs[2], vs[6] ];
		
		var G_LINES4 = new THREE.Geometry;
		G_LINES4.vertices = [ vs[1], vs[5] ];
		
		MESH_CUBE.add(new THREE.Line(G_LINES1, M_CUBE));
		MESH_CUBE.add(new THREE.Line(G_LINES2, M_CUBE));
		MESH_CUBE.add(new THREE.Line(G_LINES3, M_CUBE));
		MESH_CUBE.add(new THREE.Line(G_LINES4, M_CUBE));
		scene.add(MESH_CUBE);
		
		scene.remove(MESH_TRIANGLE);
		var G_TRIANGLE = new THREE.Geometry;
		G_TRIANGLE.vertices = triangle;
		G_TRIANGLE.faces = [ new THREE.Face3( 0, 1, 2 ) ];
		MESH_TRIANGLE = new THREE.Mesh(G_TRIANGLE, triangleMaterial);
		MESH_CUBE.add(MESH_TRIANGLE);
		
		POINT1 = new THREE.Mesh(G_POINT, M_POINT);
		POINT1.position = triangle[0];
		MESH_CUBE.add(POINT1);
		
		POINT2 = new THREE.Mesh(G_POINT, M_POINT);
		POINT2.position = triangle[1];
		MESH_CUBE.add(POINT2);
		
		POINT3 = new THREE.Mesh(G_POINT, M_POINT);
		POINT3.position = triangle[2];
		MESH_CUBE.add(POINT3);
		
		renderer.render(scene, camera);
		
		ctx.drawImage(renderer.domElement, (C_P % 4) * 160, Math.floor(C_P / 4) * 160, 160, 160);
		ctx.fillText('#' + (C_P + 1) + '.', (C_P % 4) * 160 + 6, Math.floor(C_P / 4) * 160 + 12);
		C_P++;
	}
	
	var E_TRIANGLES = [
		0, 5, 2,
		4, 1, 3,
		0, 5, 7,
		1, 4, 6,
		
		6, 3, 1,
		7, 2, 0,
		6, 3, 4,
		2, 7, 5
	];
	
	var R_TRIANGLES = [
		3, 0, 1,
		2, 3, 0,
		1, 2, 3,
		0, 1, 2,
		
		0, 4, 7,
		4, 7, 3,
		7, 3, 0,
		3, 0, 4,
		
		4, 5, 6,
		5, 6, 7,
		6, 7, 4,
		7, 4, 5,
		
		2, 1, 5,
		6, 2, 1,
		5, 6, 2,
		1, 5, 6,
		
		0, 5, 3,
		4, 1, 7,
		6, 0, 5,
		2, 4, 1,
		
		0, 6, 3,
		4, 2, 7,
		6, 3, 5,
		2, 7, 1,
		
		0, 4, 2,
		0, 4, 6,
		4, 6, 2,
		6, 2, 0,
		
		5, 7, 3,
		1, 5, 7,
		3, 1, 5,
		7, 3, 1,
		
		3, 4, 5,
		4, 5, 2,
		5, 2, 3,
		2, 3, 4,
		
		1, 7, 0,
		0, 6, 7,
		7, 1, 6,
		6, 0, 1
	];
	
	this.init = function (canvas) {
		ctx = canvas.getContext('2d');
	
		camera = new THREE.PerspectiveCamera(70, 160 / 160, 1, 1000);
		camera.position.y = 60;
		camera.position.z = 120;
		camera.lookAt(new THREE.Vector3(0, 0, 0));
		
		scene = new THREE.Scene;
		
		renderer = new THREE.CanvasRenderer;
		renderer.setSize(160, 160);
		
		for (var i = 0; i < E_TRIANGLES.length; i += 3) {
			this.drawCube([ vs[E_TRIANGLES[i]], vs[E_TRIANGLES[i + 1]], vs[E_TRIANGLES[i + 2]] ], M_EQUIL);
		}
		for (var i = 0; i < R_TRIANGLES.length; i += 3) {
			this.drawCube([ vs[R_TRIANGLES[i]], vs[R_TRIANGLES[i + 1]], vs[R_TRIANGLES[i + 2]] ], M_RIGHT);
		}
		
		ctx.beginPath();
		for (var x = 1; x < 4; x++) {
			ctx.moveTo(x * 160 + 0.5, 0.5);
			ctx.lineTo(x * 160 + 0.5, 2048.5);
		}
		for (var y = 1; y < 12; y++) {
			ctx.moveTo(0.5, y * 160 + 0.5);
			ctx.lineTo(640.5, y * 160 + 0.5);
		}
		ctx.stroke();
		
		console.log(canvas.toDataURL());
	}
};

$(function () {
	var mode = 'all';
	$('input, label').on('mouseup', function () {
		mode = $(this).attr('id') || $(this).attr('for');
	});
	
	app.init($('canvas')[0]);
});