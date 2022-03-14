

class Shahmat
{
	sizeDesk = 8;
	desk = new Array(this.sizeDesk);
	pole = new Array(this.sizeDesk);
	wood = document.querySelector(".desk");
	CONST = 
	{
		plitka: 'plitka',
		whitePlitkaClass: 'white',
		blackPlitkaClass: 'black',
		WhiteColor: 'rgba(215, 178, 155)',
		BlackColor: 'rgba(155, 80, 46)',
		width : 100,
		height: 100,
		colorFocus: 'rgba(10, 90, 150, 0.9)',
		scaleFocus: 'scale(1.1)',
		shadowFocus: "0px 0px 10px black",
		radiusFocus: '10px',
		zIndexUp: '10',
		zIndexDown: '2',
		defaultI: -1,
		defaultJ: -1,
	}
	prevFocusJ = this.CONST.defaultJ;
	prevFocusI = this.CONST.defaultI;

	constructor()
	{
		this.setZero(this.desk);
		this.setZero(this.pole);

		console.log(this.desk);
		this.placePeshkaFigures();

		let flag = true;
		for (var i = 0; i < this.sizeDesk; i++) 
		{
			for (var j = 0; j < this.sizeDesk; j++) 
			{
				if(j == 0) flag = !flag;

				let plitka = document.createElement("div");

				if(flag) 
				{
					plitka.className = this.CONST.plitka + " "+this.CONST.whitePlitkaClass+" _" + i + "__" + j + "_";
				}
				else 
				{
					plitka.className = this.CONST.plitka + " "+this.CONST.blackPlitkaClass+" _" + i + "__" + j + "_";
				}
				plitka.id = this.CONST.plitka;

				this.wood.appendChild(plitka);

				flag = !flag;
			}
		}

		this.drawPeshka();

	}

	placePeshkaFigures()
	{
		for(let i = 0; i < this.pole.length; i++)
		{
			for(let j = 0; j < this.pole.length; j++)
			{
				if(i == this.FIGURES.peshka.BlackPlaceI && (this.FIGURES.peshka.BlackPlaceJ == j || this.FIGURES.peshka.BlackPlaceJ == true))
				{
					this.pole[i][j] = this.FIGURES.peshka.idBlack;
				}
				else if(i == this.FIGURES.peshka.WhitePlaceI && (this.FIGURES.peshka.WhitePlaceJ == j || this.FIGURES.peshka.WhitePlaceJ == true))
				{
					this.pole[i][j] = this.FIGURES.peshka.idWhite;
				}
			}
		}
		console.log(this.pole)
	}

	drawPeshka()
	{
		for (let i = 0; i < this.pole.length; i++)
		{
			for (let j = 0; j < this.pole.length; j++)
			{
				let plitka = this.getThisPlitka(i, j);
				if (this.pole[i][j] == 1)
				{
					plitka.style.backgroundImage = "url(" + this.folder + this.FIGURES.peshka.Wsrc + ")";
				}
				else if (this.pole[i][j] == -1)
				{
					plitka.style.backgroundImage = "url(" + this.folder + this.FIGURES.peshka.Bsrc + ")";
				}
			}
		}
	}

	drawSingleFighure(i, j, figure)
	{
		let plitka = this.getThisPlitka(i, j);
		if (figure == 1) plitka.style.background = 'green';
	}

	setZero(array)
	{	
		for(let i = 0; i < array.length; i++)
		{
			array[i] = new Array(array.length);
			for(let j = 0; j < array.length; j++)
			{
				array[i][j] = 0;
			}
		}
	}

	addEff(obj)
	{
		obj.style.background = this.CONST.colorFocus;
		obj.style.transform = this.CONST.scaleFocus;
		obj.style.boxShadow = this.CONST.shadowFocus;
		obj.style.borderRadius = this.CONST.radiusFocus;
		obj.style.zIndex = this.CONST.zIndexUp;
	}

	deleteEff(obj, i, j)
	{
		obj.style.transform = "scale(1.0)";
		obj.style.borderRadius = '0px';
		obj.style.boxShadow = "0px 0px 0px white";
		obj.style.zIndex = this.CONST.zIndexDown;
		obj.style.background = (i + j) % 2 !== 0 ? this.CONST.BlackColor : this.CONST.WhiteColor;
	}

	addFocus(i, j)
	{

		if (this.prevFocusI !== -1 && this.prevFocusJ !== -1)
		{
			const currentPlitka = this.getThisPlitka(i, j);
			const plitkaPrev = this.getThisPlitka(this.prevFocusI, this.prevFocusJ);
			if (this.prevFocusI !== i || this.prevFocusJ !== j)
			{
				this.addEff(currentPlitka, i, j);
				this.deleteEff(plitkaPrev, this.prevFocusI, this.prevFocusJ);	
				this.desk[this.prevFocusI][this.prevFocusJ] = 0;
				this.desk[i][j] = 1;
				this.drawPossebliePosstions(i, j);
				this.removePosseliePositionsPrevius(this.prevFocusI, this.prevFocusJ);
			}  else if (this.prevFocusI === i && this.prevFocusJ === j) {
				this.desk[i][j] = 1;
				this.drawPossebliePosstions(i, j);
				this.addEff(currentPlitka)
			}
			
		} else {
			const currentPlitka = this.getThisPlitka(i, j);
			this.desk[i][j] = 1;
			this.addEff(currentPlitka);
			this.drawPossebliePosstions(i, j);
		}

		this.prevFocusI = i;
		this.prevFocusJ = j;
	}

	removeFocus(i, j)
	{
		let plitka = this.getThisPlitka(i, j);
		this.deleteEff(plitka, i, j);
		this.desk[i][j] = 0;
	}

	checkPoleFigures(i, j){ return this.pole[i][j]; }
	checkDeskFigures(i, j){ return this.desk[i][j]; }

	getThisPlitka(i, j){ return document.querySelector("._" + i + "__" + j + "_"); }

	drawPossebliePosstions (i, j) 
	{
		if (this.pole[i][j] == 1) 
		{
			this.desk[i-1][j] = 2;
			this.desk[i-2][j] = 2;
			this.getThisPlitka(i-1, j).style.background = "#f83bac"
			this.getThisPlitka(i-2, j).style.background = "#f83bac"
		}
		else if (this.pole[i][j] == -1) 
		{
			this.desk[i+1][j] = 2;
			this.desk[i+2][j] = 2;
			this.getThisPlitka(i+1, j).style.background = "red"
			this.getThisPlitka(i+2, j).style.background = "red"			
		}
	}

	removePosseliePositionsPrevius (i, j) {
		console.log(this.pole[i][j]);
		if (this.pole[i][j] === 1)
		{
			this.desk[i-1][j] = 0;
			this.desk[i-2][j] = 0;
			this.getThisPlitka(i-1, j).style.background = (i + j) % 2 !== 0 ? this.CONST.WhiteColor : this.CONST.BlackColor
			this.getThisPlitka(i-2, j).style.background = (i + j) % 2 !== 0 ? this.CONST.BlackColor : this.CONST.WhiteColor
		}
		else if (this.pole[i][j] === -1)
		{
			this.desk[i+1][j] = 2;
			this.desk[i+2][j] = 2;
			this.getThisPlitka(i-1, j).style.background = (i + j) % 2 !== 0 ? this.CONST.WhiteColor : this.CONST.BlackColor
			this.getThisPlitka(i-2, j).style.background = (i + j) % 2 !== 0 ? this.CONST.BlackColor : this.CONST.WhiteColor	
		}
		else if (this.pole[i][j] === 0)
		{
			for (let x = 0; x < this.desk.length; x++)
				for (let z = 0; z < this.desk[x].length; z++) {
					if (this.desk[x][z] === 2) { 
						this.desk[x][z] = 0;
						this.getThisPlitka(x, z).style.background = (x + z) % 2 !== 0 ? this.CONST.WhiteColor : this.CONST.BlackColor
						this.getThisPlitka(x, z).style.background = (x + z) % 2 !== 0 ? this.CONST.BlackColor : this.CONST.WhiteColor
					}
				}
		}
	}

	moveToPosition(i, j) {
		console.log('PREV', this.prevFocusI, this.prevFocusJ);

		this.pole[i][j] = this.pole[this.prevFocusI][this.prevFocusJ];
		this.pole[this.prevFocusI][this.prevFocusJ] = 0;

		console.log(this.pole);

		this.removeFocus(this.prevFocusI, this.prevFocusJ);
		console.log('prev', this.desk[this.prevFocusI][this.prevFocusJ]);
		this.removePosseliePositionsPrevius(this.prevFocusI, this.prevFocusJ);

		this.prevFocusI = -1;
		this.prevFocusJ = -1;

		this.drawSingleFighure(i, j, 1);
	}

	folder = "img/";
	positionClass = 2;
	FIGURES = 
	{
		peshka :
		{
			idBlack: -1,
			idWhite: 1, 
			BlackPlaceJ: true,
			WhitePlaceJ: true,
			BlackPlaceI: 1,
			WhitePlaceI: this.sizeDesk - 2,
			colorW: 2,
			colorB: -2,
			Bsrc: "peshkaBlack.png",
			Wsrc: "peshkaWhite.png",
		},

		towers : 
		{
			id: 2,
			colorW: "90_deg_all",
		}
	}
}

sh = new Shahmat;

addEventListener('click', function(e) {
	if(e.target.id == "plitka")
	{
		let i = e.target.classList[2].split("_")[1];
		let j = e.target.classList[2].split("_")[3];
		if(sh.pole[i][j] !== 0 && sh.desk[i][j] === 0)
		{
			sh.addFocus(i, j);
		}
		else if (sh.pole[i][j] === 0 && sh.desk[i][j] === 2) {
			console.log(i, j)
			sh.moveToPosition(i, j);
		}
		else if(sh.pole[i][j] !== 0 && sh.desk[i][j] === 1)
		{
			sh.removeFocus(i, j);
		}
		console.log(sh.desk)
	}
});
