var globalObject = (typeof global !== 'undefined') ? global : ((typeof window !== 'undefined') ? window : this);
var babylonDependency = (globalObject && globalObject.BABYLON) || BABYLON || (typeof require !== 'undefined' && require("babylonjs"));
var BABYLON = babylonDependency;
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __extends = (this && this.__extends) || (function () {
            var extendStatics = Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
                function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
            return function (d, b) {
                extendStatics(d, b);
                function __() { this.constructor = d; }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
        })();
        

var BABYLON;
(function (BABYLON) {
    var WoodProceduralTexture = /** @class */ (function (_super) {
        __extends(WoodProceduralTexture, _super);
        function WoodProceduralTexture(name, size, scene, fallbackTexture, generateMipMaps) {
            var _this = _super.call(this, name, size, "woodProceduralTexture", scene, fallbackTexture, generateMipMaps) || this;
            _this._ampScale = 100.0;
            _this._woodColor = new BABYLON.Color3(0.32, 0.17, 0.09);
            _this.updateShaderUniforms();
            return _this;
        }
        WoodProceduralTexture.prototype.updateShaderUniforms = function () {
            this.setFloat("ampScale", this._ampScale);
            this.setColor3("woodColor", this._woodColor);
        };
        Object.defineProperty(WoodProceduralTexture.prototype, "ampScale", {
            get: function () {
                return this._ampScale;
            },
            set: function (value) {
                this._ampScale = value;
                this.updateShaderUniforms();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WoodProceduralTexture.prototype, "woodColor", {
            get: function () {
                return this._woodColor;
            },
            set: function (value) {
                this._woodColor = value;
                this.updateShaderUniforms();
            },
            enumerable: true,
            configurable: true
        });
        return WoodProceduralTexture;
    }(BABYLON.ProceduralTexture));
    BABYLON.WoodProceduralTexture = WoodProceduralTexture;
})(BABYLON || (BABYLON = {}));

//# sourceMappingURL=babylon.woodProceduralTexture.js.map

BABYLON.Effect.ShadersStore['woodProceduralTexturePixelShader'] = "precision highp float;\nvarying vec2 vPosition;\nvarying vec2 vUV;\nuniform float ampScale;\nuniform vec3 woodColor;\nfloat rand(vec2 n) {\nreturn fract(cos(dot(n,vec2(12.9898,4.1414)))*43758.5453);\n}\nfloat noise(vec2 n) {\nconst vec2 d=vec2(0.0,1.0);\nvec2 b=floor(n),f=smoothstep(vec2(0.0),vec2(1.0),fract(n));\nreturn mix(mix(rand(b),rand(b+d.yx),f.x),mix(rand(b+d.xy),rand(b+d.yy),f.x),f.y);\n}\nfloat fbm(vec2 n) {\nfloat total=0.0,amplitude=1.0;\nfor (int i=0; i<4; i++) {\ntotal+=noise(n)*amplitude;\nn+=n;\namplitude*=0.5;\n}\nreturn total;\n}\nvoid main(void) {\nfloat ratioy=mod(vUV.x*ampScale,2.0+fbm(vUV*0.8));\nvec3 wood=woodColor*ratioy;\ngl_FragColor=vec4(wood,1.0);\n}";



var BABYLON;
(function (BABYLON) {
    var FireProceduralTexture = /** @class */ (function (_super) {
        __extends(FireProceduralTexture, _super);
        function FireProceduralTexture(name, size, scene, fallbackTexture, generateMipMaps) {
            var _this = _super.call(this, name, size, "fireProceduralTexture", scene, fallbackTexture, generateMipMaps) || this;
            _this._time = 0.0;
            _this._speed = new BABYLON.Vector2(0.5, 0.3);
            _this._autoGenerateTime = true;
            _this._alphaThreshold = 0.5;
            _this._fireColors = FireProceduralTexture.RedFireColors;
            _this.updateShaderUniforms();
            return _this;
        }
        FireProceduralTexture.prototype.updateShaderUniforms = function () {
            this.setFloat("time", this._time);
            this.setVector2("speed", this._speed);
            this.setColor3("c1", this._fireColors[0]);
            this.setColor3("c2", this._fireColors[1]);
            this.setColor3("c3", this._fireColors[2]);
            this.setColor3("c4", this._fireColors[3]);
            this.setColor3("c5", this._fireColors[4]);
            this.setColor3("c6", this._fireColors[5]);
            this.setFloat("alphaThreshold", this._alphaThreshold);
        };
        FireProceduralTexture.prototype.render = function (useCameraPostProcess) {
            var scene = this.getScene();
            if (this._autoGenerateTime && scene) {
                this._time += scene.getAnimationRatio() * 0.03;
                this.updateShaderUniforms();
            }
            _super.prototype.render.call(this, useCameraPostProcess);
        };
        Object.defineProperty(FireProceduralTexture, "PurpleFireColors", {
            get: function () {
                return [
                    new BABYLON.Color3(0.5, 0.0, 1.0),
                    new BABYLON.Color3(0.9, 0.0, 1.0),
                    new BABYLON.Color3(0.2, 0.0, 1.0),
                    new BABYLON.Color3(1.0, 0.9, 1.0),
                    new BABYLON.Color3(0.1, 0.1, 1.0),
                    new BABYLON.Color3(0.9, 0.9, 1.0)
                ];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FireProceduralTexture, "GreenFireColors", {
            get: function () {
                return [
                    new BABYLON.Color3(0.5, 1.0, 0.0),
                    new BABYLON.Color3(0.5, 1.0, 0.0),
                    new BABYLON.Color3(0.3, 0.4, 0.0),
                    new BABYLON.Color3(0.5, 1.0, 0.0),
                    new BABYLON.Color3(0.2, 0.0, 0.0),
                    new BABYLON.Color3(0.5, 1.0, 0.0)
                ];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FireProceduralTexture, "RedFireColors", {
            get: function () {
                return [
                    new BABYLON.Color3(0.5, 0.0, 0.1),
                    new BABYLON.Color3(0.9, 0.0, 0.0),
                    new BABYLON.Color3(0.2, 0.0, 0.0),
                    new BABYLON.Color3(1.0, 0.9, 0.0),
                    new BABYLON.Color3(0.1, 0.1, 0.1),
                    new BABYLON.Color3(0.9, 0.9, 0.9)
                ];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FireProceduralTexture, "BlueFireColors", {
            get: function () {
                return [
                    new BABYLON.Color3(0.1, 0.0, 0.5),
                    new BABYLON.Color3(0.0, 0.0, 0.5),
                    new BABYLON.Color3(0.1, 0.0, 0.2),
                    new BABYLON.Color3(0.0, 0.0, 1.0),
                    new BABYLON.Color3(0.1, 0.2, 0.3),
                    new BABYLON.Color3(0.0, 0.2, 0.9)
                ];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FireProceduralTexture.prototype, "fireColors", {
            get: function () {
                return this._fireColors;
            },
            set: function (value) {
                this._fireColors = value;
                this.updateShaderUniforms();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FireProceduralTexture.prototype, "time", {
            get: function () {
                return this._time;
            },
            set: function (value) {
                this._time = value;
                this.updateShaderUniforms();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FireProceduralTexture.prototype, "speed", {
            get: function () {
                return this._speed;
            },
            set: function (value) {
                this._speed = value;
                this.updateShaderUniforms();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FireProceduralTexture.prototype, "alphaThreshold", {
            get: function () {
                return this._alphaThreshold;
            },
            set: function (value) {
                this._alphaThreshold = value;
                this.updateShaderUniforms();
            },
            enumerable: true,
            configurable: true
        });
        return FireProceduralTexture;
    }(BABYLON.ProceduralTexture));
    BABYLON.FireProceduralTexture = FireProceduralTexture;
})(BABYLON || (BABYLON = {}));

//# sourceMappingURL=babylon.fireProceduralTexture.js.map

BABYLON.Effect.ShadersStore['fireProceduralTexturePixelShader'] = "precision highp float;\nuniform float time;\nuniform vec3 c1;\nuniform vec3 c2;\nuniform vec3 c3;\nuniform vec3 c4;\nuniform vec3 c5;\nuniform vec3 c6;\nuniform vec2 speed;\nuniform float shift;\nuniform float alphaThreshold;\nvarying vec2 vUV;\nfloat rand(vec2 n) {\nreturn fract(cos(dot(n,vec2(12.9898,4.1414)))*43758.5453);\n}\nfloat noise(vec2 n) {\nconst vec2 d=vec2(0.0,1.0);\nvec2 b=floor(n),f=smoothstep(vec2(0.0),vec2(1.0),fract(n));\nreturn mix(mix(rand(b),rand(b+d.yx),f.x),mix(rand(b+d.xy),rand(b+d.yy),f.x),f.y);\n}\nfloat fbm(vec2 n) {\nfloat total=0.0,amplitude=1.0;\nfor (int i=0; i<4; i++) {\ntotal+=noise(n)*amplitude;\nn+=n;\namplitude*=0.5;\n}\nreturn total;\n}\nvoid main() {\nvec2 p=vUV*8.0;\nfloat q=fbm(p-time*0.1);\nvec2 r=vec2(fbm(p+q+time*speed.x-p.x-p.y),fbm(p+q-time*speed.y));\nvec3 c=mix(c1,c2,fbm(p+r))+mix(c3,c4,r.x)-mix(c5,c6,r.y);\nvec3 color=c*cos(shift*vUV.y);\nfloat luminance=dot(color.rgb,vec3(0.3,0.59,0.11));\ngl_FragColor=vec4(color,luminance*alphaThreshold+(1.0-alphaThreshold));\n}";



var BABYLON;
(function (BABYLON) {
    var CloudProceduralTexture = /** @class */ (function (_super) {
        __extends(CloudProceduralTexture, _super);
        function CloudProceduralTexture(name, size, scene, fallbackTexture, generateMipMaps) {
            var _this = _super.call(this, name, size, "cloudProceduralTexture", scene, fallbackTexture, generateMipMaps) || this;
            _this._skyColor = new BABYLON.Color4(0.15, 0.68, 1.0, 1.0);
            _this._cloudColor = new BABYLON.Color4(1, 1, 1, 1.0);
            _this.updateShaderUniforms();
            return _this;
        }
        CloudProceduralTexture.prototype.updateShaderUniforms = function () {
            this.setColor4("skyColor", this._skyColor);
            this.setColor4("cloudColor", this._cloudColor);
        };
        Object.defineProperty(CloudProceduralTexture.prototype, "skyColor", {
            get: function () {
                return this._skyColor;
            },
            set: function (value) {
                this._skyColor = value;
                this.updateShaderUniforms();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CloudProceduralTexture.prototype, "cloudColor", {
            get: function () {
                return this._cloudColor;
            },
            set: function (value) {
                this._cloudColor = value;
                this.updateShaderUniforms();
            },
            enumerable: true,
            configurable: true
        });
        return CloudProceduralTexture;
    }(BABYLON.ProceduralTexture));
    BABYLON.CloudProceduralTexture = CloudProceduralTexture;
})(BABYLON || (BABYLON = {}));

//# sourceMappingURL=babylon.cloudProceduralTexture.js.map

BABYLON.Effect.ShadersStore['cloudProceduralTexturePixelShader'] = "precision highp float;\nvarying vec2 vUV;\nuniform vec4 skyColor;\nuniform vec4 cloudColor;\nfloat rand(vec2 n) {\nreturn fract(cos(dot(n,vec2(12.9898,4.1414)))*43758.5453);\n}\nfloat noise(vec2 n) {\nconst vec2 d=vec2(0.0,1.0);\nvec2 b=floor(n),f=smoothstep(vec2(0.0),vec2(1.0),fract(n));\nreturn mix(mix(rand(b),rand(b+d.yx),f.x),mix(rand(b+d.xy),rand(b+d.yy),f.x),f.y);\n}\nfloat fbm(vec2 n) {\nfloat total=0.0,amplitude=1.0;\nfor (int i=0; i<4; i++) {\ntotal+=noise(n)*amplitude;\nn+=n;\namplitude*=0.5;\n}\nreturn total;\n}\nvoid main() {\nvec2 p=vUV*12.0;\nvec4 c=mix(skyColor,cloudColor,fbm(p));\ngl_FragColor=c;\n}\n";



var BABYLON;
(function (BABYLON) {
    var GrassProceduralTexture = /** @class */ (function (_super) {
        __extends(GrassProceduralTexture, _super);
        function GrassProceduralTexture(name, size, scene, fallbackTexture, generateMipMaps) {
            var _this = _super.call(this, name, size, "grassProceduralTexture", scene, fallbackTexture, generateMipMaps) || this;
            _this._groundColor = new BABYLON.Color3(1, 1, 1);
            _this._grassColors = [
                new BABYLON.Color3(0.29, 0.38, 0.02),
                new BABYLON.Color3(0.36, 0.49, 0.09),
                new BABYLON.Color3(0.51, 0.6, 0.28)
            ];
            _this.updateShaderUniforms();
            return _this;
        }
        GrassProceduralTexture.prototype.updateShaderUniforms = function () {
            this.setColor3("herb1Color", this._grassColors[0]);
            this.setColor3("herb2Color", this._grassColors[1]);
            this.setColor3("herb3Color", this._grassColors[2]);
            this.setColor3("groundColor", this._groundColor);
        };
        Object.defineProperty(GrassProceduralTexture.prototype, "grassColors", {
            get: function () {
                return this._grassColors;
            },
            set: function (value) {
                this._grassColors = value;
                this.updateShaderUniforms();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GrassProceduralTexture.prototype, "groundColor", {
            get: function () {
                return this._groundColor;
            },
            set: function (value) {
                this._groundColor = value;
                this.updateShaderUniforms();
            },
            enumerable: true,
            configurable: true
        });
        return GrassProceduralTexture;
    }(BABYLON.ProceduralTexture));
    BABYLON.GrassProceduralTexture = GrassProceduralTexture;
})(BABYLON || (BABYLON = {}));

//# sourceMappingURL=babylon.grassProceduralTexture.js.map

BABYLON.Effect.ShadersStore['grassProceduralTexturePixelShader'] = "precision highp float;\nvarying vec2 vPosition;\nvarying vec2 vUV;\nuniform vec3 herb1Color;\nuniform vec3 herb2Color;\nuniform vec3 herb3Color;\nuniform vec3 groundColor;\nfloat rand(vec2 n) {\nreturn fract(cos(dot(n,vec2(12.9898,4.1414)))*43758.5453);\n}\nfloat noise(vec2 n) {\nconst vec2 d=vec2(0.0,1.0);\nvec2 b=floor(n),f=smoothstep(vec2(0.0),vec2(1.0),fract(n));\nreturn mix(mix(rand(b),rand(b+d.yx),f.x),mix(rand(b+d.xy),rand(b+d.yy),f.x),f.y);\n}\nfloat fbm(vec2 n) {\nfloat total=0.0,amplitude=1.0;\nfor (int i=0; i<4; i++) {\ntotal+=noise(n)*amplitude;\nn+=n;\namplitude*=0.5;\n}\nreturn total;\n}\nvoid main(void) {\nvec3 color=mix(groundColor,herb1Color,rand(gl_FragCoord.xy*4.0));\ncolor=mix(color,herb2Color,rand(gl_FragCoord.xy*8.0));\ncolor=mix(color,herb3Color,rand(gl_FragCoord.xy));\ncolor=mix(color,herb1Color,fbm(gl_FragCoord.xy*16.0));\ngl_FragColor=vec4(color,1.0);\n}";



var BABYLON;
(function (BABYLON) {
    var RoadProceduralTexture = /** @class */ (function (_super) {
        __extends(RoadProceduralTexture, _super);
        function RoadProceduralTexture(name, size, scene, fallbackTexture, generateMipMaps) {
            var _this = _super.call(this, name, size, "roadProceduralTexture", scene, fallbackTexture, generateMipMaps) || this;
            _this._roadColor = new BABYLON.Color3(0.53, 0.53, 0.53);
            _this.updateShaderUniforms();
            return _this;
        }
        RoadProceduralTexture.prototype.updateShaderUniforms = function () {
            this.setColor3("roadColor", this._roadColor);
        };
        Object.defineProperty(RoadProceduralTexture.prototype, "roadColor", {
            get: function () {
                return this._roadColor;
            },
            set: function (value) {
                this._roadColor = value;
                this.updateShaderUniforms();
            },
            enumerable: true,
            configurable: true
        });
        return RoadProceduralTexture;
    }(BABYLON.ProceduralTexture));
    BABYLON.RoadProceduralTexture = RoadProceduralTexture;
})(BABYLON || (BABYLON = {}));

//# sourceMappingURL=babylon.roadProceduralTexture.js.map

BABYLON.Effect.ShadersStore['roadProceduralTexturePixelShader'] = "precision highp float;\nvarying vec2 vUV; \nuniform vec3 roadColor;\nfloat rand(vec2 n) {\nreturn fract(cos(dot(n,vec2(12.9898,4.1414)))*43758.5453);\n}\nfloat noise(vec2 n) {\nconst vec2 d=vec2(0.0,1.0);\nvec2 b=floor(n),f=smoothstep(vec2(0.0),vec2(1.0),fract(n));\nreturn mix(mix(rand(b),rand(b+d.yx),f.x),mix(rand(b+d.xy),rand(b+d.yy),f.x),f.y);\n}\nfloat fbm(vec2 n) {\nfloat total=0.0,amplitude=1.0;\nfor (int i=0; i<4; i++) {\ntotal+=noise(n)*amplitude;\nn+=n;\namplitude*=0.5;\n}\nreturn total;\n}\nvoid main(void) {\nfloat ratioy=mod(gl_FragCoord.y*100.0 ,fbm(vUV*2.0));\nvec3 color=roadColor*ratioy;\ngl_FragColor=vec4(color,1.0);\n}";



var BABYLON;
(function (BABYLON) {
    var BrickProceduralTexture = /** @class */ (function (_super) {
        __extends(BrickProceduralTexture, _super);
        function BrickProceduralTexture(name, size, scene, fallbackTexture, generateMipMaps) {
            var _this = _super.call(this, name, size, "brickProceduralTexture", scene, fallbackTexture, generateMipMaps) || this;
            _this._numberOfBricksHeight = 15;
            _this._numberOfBricksWidth = 5;
            _this._jointColor = new BABYLON.Color3(0.72, 0.72, 0.72);
            _this._brickColor = new BABYLON.Color3(0.77, 0.47, 0.40);
            _this.updateShaderUniforms();
            return _this;
        }
        BrickProceduralTexture.prototype.updateShaderUniforms = function () {
            this.setFloat("numberOfBricksHeight", this._numberOfBricksHeight);
            this.setFloat("numberOfBricksWidth", this._numberOfBricksWidth);
            this.setColor3("brickColor", this._brickColor);
            this.setColor3("jointColor", this._jointColor);
        };
        Object.defineProperty(BrickProceduralTexture.prototype, "numberOfBricksHeight", {
            get: function () {
                return this._numberOfBricksHeight;
            },
            set: function (value) {
                this._numberOfBricksHeight = value;
                this.updateShaderUniforms();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BrickProceduralTexture.prototype, "numberOfBricksWidth", {
            get: function () {
                return this._numberOfBricksWidth;
            },
            set: function (value) {
                this._numberOfBricksWidth = value;
                this.updateShaderUniforms();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BrickProceduralTexture.prototype, "jointColor", {
            get: function () {
                return this._jointColor;
            },
            set: function (value) {
                this._jointColor = value;
                this.updateShaderUniforms();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BrickProceduralTexture.prototype, "brickColor", {
            get: function () {
                return this._brickColor;
            },
            set: function (value) {
                this._brickColor = value;
                this.updateShaderUniforms();
            },
            enumerable: true,
            configurable: true
        });
        return BrickProceduralTexture;
    }(BABYLON.ProceduralTexture));
    BABYLON.BrickProceduralTexture = BrickProceduralTexture;
})(BABYLON || (BABYLON = {}));

//# sourceMappingURL=babylon.brickProceduralTexture.js.map

BABYLON.Effect.ShadersStore['brickProceduralTexturePixelShader'] = "precision highp float;\nvarying vec2 vPosition;\nvarying vec2 vUV;\nuniform float numberOfBricksHeight;\nuniform float numberOfBricksWidth;\nuniform vec3 brickColor;\nuniform vec3 jointColor;\nfloat rand(vec2 n) {\nreturn fract(cos(dot(n,vec2(12.9898,4.1414)))*43758.5453);\n}\nfloat noise(vec2 n) {\nconst vec2 d=vec2(0.0,1.0);\nvec2 b=floor(n),f=smoothstep(vec2(0.0),vec2(1.0),fract(n));\nreturn mix(mix(rand(b),rand(b+d.yx),f.x),mix(rand(b+d.xy),rand(b+d.yy),f.x),f.y);\n}\nfloat fbm(vec2 n) {\nfloat total=0.0,amplitude=1.0;\nfor (int i=0; i<4; i++) {\ntotal+=noise(n)*amplitude;\nn+=n;\namplitude*=0.5;\n}\nreturn total;\n}\nfloat roundF(float number){\nreturn sign(number)*floor(abs(number)+0.5);\n}\nvoid main(void)\n{\nfloat brickW=1.0/numberOfBricksWidth;\nfloat brickH=1.0/numberOfBricksHeight;\nfloat jointWPercentage=0.01;\nfloat jointHPercentage=0.05;\nvec3 color=brickColor;\nfloat yi=vUV.y/brickH;\nfloat nyi=roundF(yi);\nfloat xi=vUV.x/brickW;\nif (mod(floor(yi),2.0) == 0.0){\nxi=xi-0.5;\n}\nfloat nxi=roundF(xi);\nvec2 brickvUV=vec2((xi-floor(xi))/brickH,(yi-floor(yi))/brickW);\nif (yi<nyi+jointHPercentage && yi>nyi-jointHPercentage){\ncolor=mix(jointColor,vec3(0.37,0.25,0.25),(yi-nyi)/jointHPercentage+0.2);\n}\nelse if (xi<nxi+jointWPercentage && xi>nxi-jointWPercentage){\ncolor=mix(jointColor,vec3(0.44,0.44,0.44),(xi-nxi)/jointWPercentage+0.2);\n}\nelse {\nfloat brickColorSwitch=mod(floor(yi)+floor(xi),3.0);\nif (brickColorSwitch == 0.0)\ncolor=mix(color,vec3(0.33,0.33,0.33),0.3);\nelse if (brickColorSwitch == 2.0)\ncolor=mix(color,vec3(0.11,0.11,0.11),0.3);\n}\ngl_FragColor=vec4(color,1.0);\n}";



var BABYLON;
(function (BABYLON) {
    var MarbleProceduralTexture = /** @class */ (function (_super) {
        __extends(MarbleProceduralTexture, _super);
        function MarbleProceduralTexture(name, size, scene, fallbackTexture, generateMipMaps) {
            var _this = _super.call(this, name, size, "marbleProceduralTexture", scene, fallbackTexture, generateMipMaps) || this;
            _this._numberOfTilesHeight = 3;
            _this._numberOfTilesWidth = 3;
            _this._amplitude = 9.0;
            _this._jointColor = new BABYLON.Color3(0.72, 0.72, 0.72);
            _this.updateShaderUniforms();
            return _this;
        }
        MarbleProceduralTexture.prototype.updateShaderUniforms = function () {
            this.setFloat("numberOfTilesHeight", this._numberOfTilesHeight);
            this.setFloat("numberOfTilesWidth", this._numberOfTilesWidth);
            this.setFloat("amplitude", this._amplitude);
            this.setColor3("jointColor", this._jointColor);
        };
        Object.defineProperty(MarbleProceduralTexture.prototype, "numberOfTilesHeight", {
            get: function () {
                return this._numberOfTilesHeight;
            },
            set: function (value) {
                this._numberOfTilesHeight = value;
                this.updateShaderUniforms();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MarbleProceduralTexture.prototype, "amplitude", {
            get: function () {
                return this._amplitude;
            },
            set: function (value) {
                this._amplitude = value;
                this.updateShaderUniforms();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MarbleProceduralTexture.prototype, "numberOfTilesWidth", {
            get: function () {
                return this._numberOfTilesWidth;
            },
            set: function (value) {
                this._numberOfTilesWidth = value;
                this.updateShaderUniforms();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MarbleProceduralTexture.prototype, "jointColor", {
            get: function () {
                return this._jointColor;
            },
            set: function (value) {
                this._jointColor = value;
                this.updateShaderUniforms();
            },
            enumerable: true,
            configurable: true
        });
        return MarbleProceduralTexture;
    }(BABYLON.ProceduralTexture));
    BABYLON.MarbleProceduralTexture = MarbleProceduralTexture;
})(BABYLON || (BABYLON = {}));

//# sourceMappingURL=babylon.marbleProceduralTexture.js.map

BABYLON.Effect.ShadersStore['marbleProceduralTexturePixelShader'] = "precision highp float;\nvarying vec2 vPosition;\nvarying vec2 vUV;\nuniform float numberOfTilesHeight;\nuniform float numberOfTilesWidth;\nuniform float amplitude;\nuniform vec3 marbleColor;\nuniform vec3 jointColor;\nconst vec3 tileSize=vec3(1.1,1.0,1.1);\nconst vec3 tilePct=vec3(0.98,1.0,0.98);\nfloat rand(vec2 n) {\nreturn fract(cos(dot(n,vec2(12.9898,4.1414)))*43758.5453);\n}\nfloat noise(vec2 n) {\nconst vec2 d=vec2(0.0,1.0);\nvec2 b=floor(n),f=smoothstep(vec2(0.0),vec2(1.0),fract(n));\nreturn mix(mix(rand(b),rand(b+d.yx),f.x),mix(rand(b+d.xy),rand(b+d.yy),f.x),f.y);\n}\nfloat turbulence(vec2 P)\n{\nfloat val=0.0;\nfloat freq=1.0;\nfor (int i=0; i<4; i++)\n{\nval+=abs(noise(P*freq)/freq);\nfreq*=2.07;\n}\nreturn val;\n}\nfloat roundF(float number){\nreturn sign(number)*floor(abs(number)+0.5);\n}\nvec3 marble_color(float x)\n{\nvec3 col;\nx=0.5*(x+1.);\nx=sqrt(x); \nx=sqrt(x);\nx=sqrt(x);\ncol=vec3(.2+.75*x); \ncol.b*=0.95; \nreturn col;\n}\nvoid main()\n{\nfloat brickW=1.0/numberOfTilesWidth;\nfloat brickH=1.0/numberOfTilesHeight;\nfloat jointWPercentage=0.01;\nfloat jointHPercentage=0.01;\nvec3 color=marbleColor;\nfloat yi=vUV.y/brickH;\nfloat nyi=roundF(yi);\nfloat xi=vUV.x/brickW;\nif (mod(floor(yi),2.0) == 0.0){\nxi=xi-0.5;\n}\nfloat nxi=roundF(xi);\nvec2 brickvUV=vec2((xi-floor(xi))/brickH,(yi-floor(yi))/brickW);\nif (yi<nyi+jointHPercentage && yi>nyi-jointHPercentage){\ncolor=mix(jointColor,vec3(0.37,0.25,0.25),(yi-nyi)/jointHPercentage+0.2);\n}\nelse if (xi<nxi+jointWPercentage && xi>nxi-jointWPercentage){\ncolor=mix(jointColor,vec3(0.44,0.44,0.44),(xi-nxi)/jointWPercentage+0.2);\n}\nelse {\nfloat t=6.28*brickvUV.x/(tileSize.x+noise(vec2(vUV)*6.0));\nt+=amplitude*turbulence(brickvUV.xy);\nt=sin(t);\ncolor=marble_color(t);\n}\ngl_FragColor=vec4(color,0.0);\n}";



var BABYLON;
(function (BABYLON) {
    var StarfieldProceduralTexture = /** @class */ (function (_super) {
        __extends(StarfieldProceduralTexture, _super);
        function StarfieldProceduralTexture(name, size, scene, fallbackTexture, generateMipMaps) {
            var _this = _super.call(this, name, size, "starfieldProceduralTexture", scene, fallbackTexture, generateMipMaps) || this;
            _this._time = 1;
            _this._alpha = 0.5;
            _this._beta = 0.8;
            _this._zoom = 0.8;
            _this._formuparam = 0.53;
            _this._stepsize = 0.1;
            _this._tile = 0.850;
            _this._brightness = 0.0015;
            _this._darkmatter = 0.400;
            _this._distfading = 0.730;
            _this._saturation = 0.850;
            _this.updateShaderUniforms();
            return _this;
        }
        StarfieldProceduralTexture.prototype.updateShaderUniforms = function () {
            this.setFloat("time", this._time);
            this.setFloat("alpha", this._alpha);
            this.setFloat("beta", this._beta);
            this.setFloat("zoom", this._zoom);
            this.setFloat("formuparam", this._formuparam);
            this.setFloat("stepsize", this._stepsize);
            this.setFloat("tile", this._tile);
            this.setFloat("brightness", this._brightness);
            this.setFloat("darkmatter", this._darkmatter);
            this.setFloat("distfading", this._distfading);
            this.setFloat("saturation", this._saturation);
        };
        Object.defineProperty(StarfieldProceduralTexture.prototype, "time", {
            get: function () {
                return this._time;
            },
            set: function (value) {
                this._time = value;
                this.updateShaderUniforms();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(StarfieldProceduralTexture.prototype, "alpha", {
            get: function () {
                return this._alpha;
            },
            set: function (value) {
                this._alpha = value;
                this.updateShaderUniforms();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(StarfieldProceduralTexture.prototype, "beta", {
            get: function () {
                return this._beta;
            },
            set: function (value) {
                this._beta = value;
                this.updateShaderUniforms();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(StarfieldProceduralTexture.prototype, "formuparam", {
            get: function () {
                return this._formuparam;
            },
            set: function (value) {
                this._formuparam = value;
                this.updateShaderUniforms();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(StarfieldProceduralTexture.prototype, "stepsize", {
            get: function () {
                return this._stepsize;
            },
            set: function (value) {
                this._stepsize = value;
                this.updateShaderUniforms();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(StarfieldProceduralTexture.prototype, "zoom", {
            get: function () {
                return this._zoom;
            },
            set: function (value) {
                this._zoom = value;
                this.updateShaderUniforms();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(StarfieldProceduralTexture.prototype, "tile", {
            get: function () {
                return this._tile;
            },
            set: function (value) {
                this._tile = value;
                this.updateShaderUniforms();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(StarfieldProceduralTexture.prototype, "brightness", {
            get: function () {
                return this._brightness;
            },
            set: function (value) {
                this._brightness = value;
                this.updateShaderUniforms();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(StarfieldProceduralTexture.prototype, "darkmatter", {
            get: function () {
                return this._darkmatter;
            },
            set: function (value) {
                this._darkmatter = value;
                this.updateShaderUniforms();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(StarfieldProceduralTexture.prototype, "distfading", {
            get: function () {
                return this._distfading;
            },
            set: function (value) {
                this._distfading = value;
                this.updateShaderUniforms();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(StarfieldProceduralTexture.prototype, "saturation", {
            get: function () {
                return this._saturation;
            },
            set: function (value) {
                this._saturation = value;
                this.updateShaderUniforms();
            },
            enumerable: true,
            configurable: true
        });
        return StarfieldProceduralTexture;
    }(BABYLON.ProceduralTexture));
    BABYLON.StarfieldProceduralTexture = StarfieldProceduralTexture;
})(BABYLON || (BABYLON = {}));

//# sourceMappingURL=babylon.starfieldProceduralTexture.js.map

BABYLON.Effect.ShadersStore['starfieldProceduralTexturePixelShader'] = "precision highp float;\n\n#define volsteps 20\n#define iterations 15\nvarying vec2 vPosition;\nvarying vec2 vUV;\nuniform float time;\nuniform float alpha;\nuniform float beta;\nuniform float zoom;\nuniform float formuparam;\nuniform float stepsize;\nuniform float tile;\nuniform float brightness;\nuniform float darkmatter;\nuniform float distfading;\nuniform float saturation;\nvoid main()\n{\nvec3 dir=vec3(vUV*zoom,1.);\nfloat localTime=time*0.0001;\n\nmat2 rot1=mat2(cos(alpha),sin(alpha),-sin(alpha),cos(alpha));\nmat2 rot2=mat2(cos(beta),sin(beta),-sin(beta),cos(beta));\ndir.xz*=rot1;\ndir.xy*=rot2;\nvec3 from=vec3(1.,.5,0.5);\nfrom+=vec3(-2.,localTime*2.,localTime);\nfrom.xz*=rot1;\nfrom.xy*=rot2;\n\nfloat s=0.1,fade=1.;\nvec3 v=vec3(0.);\nfor (int r=0; r<volsteps; r++) {\nvec3 p=from+s*dir*.5;\np=abs(vec3(tile)-mod(p,vec3(tile*2.))); \nfloat pa,a=pa=0.;\nfor (int i=0; i<iterations; i++) {\np=abs(p)/dot(p,p)-formuparam; \na+=abs(length(p)-pa); \npa=length(p);\n}\nfloat dm=max(0.,darkmatter-a*a*.001); \na*=a*a; \nif (r>6) fade*=1.-dm; \n\nv+=fade;\nv+=vec3(s,s*s,s*s*s*s)*a*brightness*fade; \nfade*=distfading; \ns+=stepsize;\n}\nv=mix(vec3(length(v)),v,saturation); \ngl_FragColor=vec4(v*.01,1.);\n}";



var BABYLON;
(function (BABYLON) {
    var NormalMapProceduralTexture = /** @class */ (function (_super) {
        __extends(NormalMapProceduralTexture, _super);
        function NormalMapProceduralTexture(name, size, scene, fallbackTexture, generateMipMaps) {
            var _this = _super.call(this, name, size, "normalMapProceduralTexture", scene, fallbackTexture, generateMipMaps) || this;
            _this.updateShaderUniforms();
            return _this;
        }
        NormalMapProceduralTexture.prototype.updateShaderUniforms = function () {
            this.setTexture("baseSampler", this._baseTexture);
            this.setFloat("size", this.getRenderSize());
        };
        NormalMapProceduralTexture.prototype.render = function (useCameraPostProcess) {
            _super.prototype.render.call(this, useCameraPostProcess);
        };
        NormalMapProceduralTexture.prototype.resize = function (size, generateMipMaps) {
            _super.prototype.resize.call(this, size, generateMipMaps);
            // We need to update the "size" uniform
            this.updateShaderUniforms();
        };
        Object.defineProperty(NormalMapProceduralTexture.prototype, "baseTexture", {
            get: function () {
                return this._baseTexture;
            },
            set: function (texture) {
                this._baseTexture = texture;
                this.updateShaderUniforms();
            },
            enumerable: true,
            configurable: true
        });
        return NormalMapProceduralTexture;
    }(BABYLON.ProceduralTexture));
    BABYLON.NormalMapProceduralTexture = NormalMapProceduralTexture;
})(BABYLON || (BABYLON = {}));

//# sourceMappingURL=babylon.normalMapProceduralTexture.js.map

BABYLON.Effect.ShadersStore['normalMapProceduralTexturePixelShader'] = "precision highp float;\n\nuniform sampler2D baseSampler;\nuniform float size;\n\nvarying vec2 vUV;\n\nconst vec3 LUMA_COEFFICIENT=vec3(0.2126,0.7152,0.0722);\nfloat lumaAtCoord(vec2 coord)\n{\nvec3 pixel=texture2D(baseSampler,coord).rgb;\nfloat luma=dot(pixel,LUMA_COEFFICIENT);\nreturn luma;\n}\nvoid main()\n{\nfloat lumaU0=lumaAtCoord(vUV+vec2(-1.0,0.0)/size);\nfloat lumaU1=lumaAtCoord(vUV+vec2( 1.0,0.0)/size);\nfloat lumaV0=lumaAtCoord(vUV+vec2( 0.0,-1.0)/size);\nfloat lumaV1=lumaAtCoord(vUV+vec2( 0.0,1.0)/size);\nvec2 slope=(vec2(lumaU0-lumaU1,lumaV0-lumaV1)+1.0)*0.5;\ngl_FragColor=vec4(slope,1.0,1.0);\n}\n";



var BABYLON;
(function (BABYLON) {
    var PerlinNoiseProceduralTexture = /** @class */ (function (_super) {
        __extends(PerlinNoiseProceduralTexture, _super);
        function PerlinNoiseProceduralTexture(name, size, scene, fallbackTexture, generateMipMaps) {
            var _this = _super.call(this, name, size, "perlinNoiseProceduralTexture", scene, fallbackTexture, generateMipMaps) || this;
            _this.time = 0.0;
            _this.speed = 1.0;
            _this.translationSpeed = 1.0;
            _this._currentTranslation = 0;
            _this.updateShaderUniforms();
            return _this;
        }
        PerlinNoiseProceduralTexture.prototype.updateShaderUniforms = function () {
            this.setFloat("size", this.getRenderSize());
            var scene = this.getScene();
            if (!scene) {
                return;
            }
            var deltaTime = scene.getEngine().getDeltaTime();
            this.time += deltaTime;
            this.setFloat("time", this.time * this.speed / 1000);
            this._currentTranslation += deltaTime * this.translationSpeed / 1000.0;
            this.setFloat("translationSpeed", this._currentTranslation);
        };
        PerlinNoiseProceduralTexture.prototype.render = function (useCameraPostProcess) {
            this.updateShaderUniforms();
            _super.prototype.render.call(this, useCameraPostProcess);
        };
        PerlinNoiseProceduralTexture.prototype.resize = function (size, generateMipMaps) {
            _super.prototype.resize.call(this, size, generateMipMaps);
        };
        return PerlinNoiseProceduralTexture;
    }(BABYLON.ProceduralTexture));
    BABYLON.PerlinNoiseProceduralTexture = PerlinNoiseProceduralTexture;
})(BABYLON || (BABYLON = {}));

//# sourceMappingURL=babylon.perlinNoiseProceduralTexture.js.map

BABYLON.Effect.ShadersStore['perlinNoiseProceduralTexturePixelShader'] = "\nprecision highp float;\n\nuniform float size;\nuniform float time;\nuniform float translationSpeed;\n\nvarying vec2 vUV;\n\nfloat r(float n)\n{\nreturn fract(cos(n*89.42)*343.42);\n}\nvec2 r(vec2 n)\n{\nreturn vec2(r(n.x*23.62-300.0+n.y*34.35),r(n.x*45.13+256.0+n.y*38.89)); \n}\nfloat worley(vec2 n,float s)\n{\nfloat dis=1.0;\nfor(int x=-1; x<=1; x++)\n{\nfor(int y=-1; y<=1; y++)\n{\nvec2 p=floor(n/s)+vec2(x,y);\nfloat d=length(r(p)+vec2(x,y)-fract(n/s));\nif (dis>d)\ndis=d;\n}\n}\nreturn 1.0-dis;\n}\nvec3 hash33(vec3 p3)\n{\np3=fract(p3*vec3(0.1031,0.11369,0.13787));\np3+=dot(p3,p3.yxz+19.19);\nreturn -1.0+2.0*fract(vec3((p3.x+p3.y)*p3.z,(p3.x+p3.z)*p3.y,(p3.y+p3.z)*p3.x));\n}\nfloat perlinNoise(vec3 p)\n{\nvec3 pi=floor(p);\nvec3 pf=p-pi;\nvec3 w=pf*pf*(3.0-2.0*pf);\nreturn mix(\nmix(\nmix(\ndot(pf-vec3(0,0,0),hash33(pi+vec3(0,0,0))),\ndot(pf-vec3(1,0,0),hash33(pi+vec3(1,0,0))),\nw.x\n),\nmix(\ndot(pf-vec3(0,0,1),hash33(pi+vec3(0,0,1))),\ndot(pf-vec3(1,0,1),hash33(pi+vec3(1,0,1))),\nw.x\n),\nw.z\n),\nmix(\nmix(\ndot(pf-vec3(0,1,0),hash33(pi+vec3(0,1,0))),\ndot(pf-vec3(1,1,0),hash33(pi+vec3(1,1,0))),\nw.x\n),\nmix(\ndot(pf-vec3(0,1,1),hash33(pi+vec3(0,1,1))),\ndot(pf-vec3(1,1,1),hash33(pi+vec3(1,1,1))),\nw.x\n),\nw.z\n),\nw.y\n);\n}\n\nvoid main(void)\n{\nvec2 uv=gl_FragCoord.xy+translationSpeed;\nfloat dis=(\n1.0+perlinNoise(vec3(uv/vec2(size,size),time*0.05)*8.0))\n*(1.0+(worley(uv,32.0)+ 0.5*worley(2.0*uv,32.0)+0.25*worley(4.0*uv,32.0))\n);\ngl_FragColor=vec4(vec3(dis/4.0),1.0);\n}\n";


(function universalModuleDefinition(root, factory) {
                var f = factory();
                if (root && root["BABYLON"]) {
                    return;
                }
                
    if(typeof exports === 'object' && typeof module === 'object')
        module.exports = f;
    else if(typeof define === 'function' && define.amd)
        define(["BJSProceduralTextures"], factory);
    else if(typeof exports === 'object')
        exports["BJSProceduralTextures"] = f;
    else {
        root["BABYLON"] = f;
    }
})(this, function() {
    return BABYLON;
});

class ObjMeta  {
  constructor() {
    this.name = "";
  }
}
class test_3d  {
  constructor() {
  }
}
/* static JavaSript main routine at the end of the JS file */
function __js_main() {
  const canvas = document.getElementById("renderCanvas");
  const engine = new BABYLON.Engine(canvas, true, {stencil: true});
  const scene = new BABYLON.Scene(engine);
  
  window.addEventListener('resize', function() {
      engine.resize();
  })
        
  const camera = new BABYLON.FreeCamera("cam1", (new BABYLON.Vector3(0, 11, -25)), scene);
  camera.setTarget(new BABYLON.Vector3(0, 0, 0));
  const loader = new BABYLON.AssetsManager(scene);
  const m = loader.addTextureTask("board",  "https://s3-us-west-2.amazonaws.com/s.cdpn.io/1134652/dice.png");
  m.onSuccess = (_task)=> {
    (((event) => { 
      new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
      new BABYLON.DirectionalLight("light2",new BABYLON.Vector3(-1, -1, -1),scene);
      const s1 = new BABYLON.Mesh.CreateSphere("s", 16.0, 1.0, scene);
      const s2 = new BABYLON.Mesh.CreateSphere("s", 16.0, 1.0, scene);
      const hl_layer = new BABYLON.HighlightLayer("hl1", scene);
      const dice = BABYLON.MeshBuilder.CreateBox("b", {width:1.5, height:1.5, depth:1.5, faceUV:[(new BABYLON.Vector4(0.0, 0.0,0.33,0.5)), (new BABYLON.Vector4(0.33, 0.0,0.66,0.5)), (new BABYLON.Vector4(0.66, 0.0,1.0,0.5)), (new BABYLON.Vector4(0.0, 0.5,0.33,1.0)), (new BABYLON.Vector4(0.33, 0.5,0.66,1.0)), (new BABYLON.Vector4(0.66, 0.5,1.0,1.0))]}, scene);
      dice.translate(new BABYLON.Vector3(-4, 5, 4), 1, BABYLON.Space.WORLD ) ;
      dice.rotationQuaternion = new BABYLON.Quaternion.RotationAxis((new BABYLON.Vector3(-1.0, 1.0,0.0)), ((Math.PI) * 0.6));
      const dData = new ObjMeta();
      dice.data = dData;
      dData.name = "dice";
      const points = [new BABYLON.Vector3(0, -2, 0), new BABYLON.Vector3(0, 1, 0)];
      const myTube = BABYLON.MeshBuilder.CreateTube("tube", {path: points, radiusFunction:((i, distance) => { 
        if ( i == 0 ) {
          return 1.0;
        }
        return 0.2;
      }), cap:BABYLON.Mesh.CAP_ALL}, scene);
      const head = new BABYLON.Mesh.CreateSphere("head", 16.0, 1.5, scene);
      head.translate(new BABYLON.Vector3(0, 1, 0), 1, BABYLON.Space.WORLD ) ;
      /** unused:  let merkit = []   **/ 
      const nappula = BABYLON.Mesh.MergeMeshes([myTube, head]);
      nappula.translate(new BABYLON.Vector3(6, 0, 4), 1, BABYLON.Space.WORLD ) ;
      const groundObj = BABYLON.MeshBuilder.CreateBox("board", {width:30.0, height:0.5, depth:30.0}, scene);
      groundObj.translate(new BABYLON.Vector3(-1, -1, -1), 1, BABYLON.Space.WORLD ) ;
      groundObj.data = new ObjMeta();
      s1.data = new ObjMeta();
      s2.data = new ObjMeta();
      const hlMaterial = new BABYLON.StandardMaterial("red", scene);
      hlMaterial.diffuseColor = new BABYLON.Color3(1.0, 0.3, 0.4);
      hlMaterial.specularColor  = new BABYLON.Color3(0.8, 0.2, 1.0);
      hlMaterial.emissiveColor   = new BABYLON.Color3(0.8, 0.2, 0.2);
      hlMaterial.alpha = 0.5;
      const orangeMaterial = new BABYLON.StandardMaterial("red", scene);
      orangeMaterial.diffuseColor = new BABYLON.Color3(1.0, 1.0, 0.4);
      /** unused:  const text2 = new BABYLON.Texture("bump_normal.png", scene)   **/ 
      const redMaterial = new BABYLON.StandardMaterial("red", scene);
      redMaterial.diffuseColor = new BABYLON.Color3(1.0, 0.3, 0.4);
      redMaterial.specularColor  = new BABYLON.Color3(0.8, 0.2, 1.0);
      redMaterial.emissiveColor   = new BABYLON.Color3(0.8, 0.2, 0.2);
      dice.material  = redMaterial;
      nappula.material  = redMaterial;
      nappula.scaling = new BABYLON.Vector3(0.3, 0.3,0.3);
      const n2 = nappula.clone("");
      n2.translate(new BABYLON.Vector3(1, 0, -7), 1, BABYLON.Space.WORLD ) ;
      const n3 = nappula.clone("");
      n3.translate(new BABYLON.Vector3(-4, 0, 3), 1, BABYLON.Space.WORLD ) ;
      const groundMaterial = new BABYLON.StandardMaterial("ground", scene);
      groundMaterial.diffuseColor = new BABYLON.Color3(0.2, 0.3, 0.4);
      groundMaterial.specularColor  = new BABYLON.Color3(1.0, 1.0, 1.0);
      const text = ( (c,g)=>{ var t = new BABYLON.GrassProceduralTexture( "grass" , 1024, scene);t.grassColor = c; t.groundColor=g; return t;})((new BABYLON.Color3(0.2, 0.8, 0.2)), (new BABYLON.Color3(0.2, 0.5, 0.2)));
      text.vScale = -1.0;
      text.uScale = -1.0;
      groundMaterial.diffuseTexture = text;
      const cardMaterial = new BABYLON.StandardMaterial("cardmat", scene);
      cardMaterial.diffuseColor = new BABYLON.Color3(0.2, 0.3, 0.4);
      cardMaterial.specularColor  = new BABYLON.Color3(1.0, 0.3, 0.6);
      const text_1 = new BABYLON.Texture("https://s3-us-west-2.amazonaws.com/s.cdpn.io/1134652/dice.png", scene);
      text_1.vScale = -1.0;
      text_1.uScale = -1.0;
      cardMaterial.diffuseTexture = text_1;
      const fancyMaterial = new BABYLON.StandardMaterial("ground", scene);
      fancyMaterial.diffuseColor = new BABYLON.Color3(0.8, 0.41, 0.28);
      fancyMaterial.specularColor  = new BABYLON.Color3(1.0, 1.0, 1.0);
      s1.material  = fancyMaterial;
      s2.material  = fancyMaterial;
      const diceMaterial = new BABYLON.StandardMaterial("dicemat", scene);
      diceMaterial.specularColor  = new BABYLON.Color3(1.0, 0.3, 0.6);
      const text_2 = new BABYLON.Texture("https://s3-us-west-2.amazonaws.com/s.cdpn.io/1134652/dice.png", scene);
      text_2.vScale = -1.0;
      text_2.uScale = -1.0;
      diceMaterial.diffuseTexture = text_2;
      dice.material  = diceMaterial;
      s1.translate(new BABYLON.Vector3(2, 0, 0), 1, BABYLON.Space.WORLD ) ;
      s2.translate(new BABYLON.Vector3(-4, 0, -1), 1, BABYLON.Space.WORLD ) ;
      camera.attachControl(canvas, false);
      /** unused:  const zz = -10.0   **/ 
      let time = 0.0;
      let oPos = (s2.position).clone();
      let pickedObj;
      let diceThrow = false;
      let diceStabileCnt = 0;
      canvas.addEventListener("click", (e)=>{ (((ev) => { 
        console.log((("Pointer : " + (scene.pointerX)) + " , ") + (scene.pointerY));
        const pickRes = scene.pick((scene.pointerX), (scene.pointerY));
        const point = pickRes.pickedPoint;
        if ( (typeof(point) !== "undefined" && point != null )  ) {
          const p = point;
          console.log("--> point was : " + (p.x));
          pickedObj = (pickRes.pickedMesh);
          let obj = pickedObj;
          while ((typeof((obj.parent)) !== "undefined" && (obj.parent) != null ) ) {
            obj = (obj.parent);
          };
          pickedObj = obj;
          oPos = (obj.position).clone();
          time = 0.0;
          const d = (pickedObj).data;
          if ( (typeof(d) !== "undefined" && d != null )  ) {
            if( typeof(d) === 'string' ) /* union case for string */ {
              var str = d;
              console.log(str);
            };
          }
          const meta = obj.data;
          if ( (typeof(meta) !== "undefined" && meta != null )  ) {
            if( meta instanceof ObjMeta ) /* union case */ {
              var data = meta;
              if ( (typeof(data.physics) !== "undefined" && data.physics != null )  ) {
                if ( obj == dice ) {
                  diceThrow = true;
                  diceStabileCnt = 10;
                }
                data.physics.applyImpulse(new BABYLON.Vector3(0, 10, 0), p ) ;
              }
            };
          }
        }
      }))(e) } ) 
      scene.enablePhysics();
      const opt1 = {};
      opt1.mass = 0.0;
      opt1.restitution = 0.2;
      const opt2 = {};
      opt2.mass = 1.0;
      opt2.restitution = 0.7;
      opt2.friction = 0.3;
      const opt3 = {};
      opt3.mass = 0.8;
      opt3.restitution = 0.1;
      opt3.friction = 0.4;
      const initGrounds = ((o) => { 
        o.physicsImpostor = new BABYLON.PhysicsImpostor(o, (BABYLON.PhysicsImpostor.BoxImpostor), opt1, scene);
        o.material  = groundMaterial;
      });
      initGrounds(groundObj);
      const applyPhysics = ((obj, opt, type) => { 
        const p_1 = new BABYLON.PhysicsImpostor(obj, type, opt, scene);
        obj.physicsImpostor = p_1;
        let meta_1 = obj.data;
        if ( typeof(meta_1) === "undefined" ) {
          meta_1 = new ObjMeta();
          obj.data = meta_1;
        }
        if ( (typeof(meta_1) !== "undefined" && meta_1 != null )  ) {
          if( meta_1 instanceof ObjMeta ) /* union case */ {
            var data_1 = meta_1;
            data_1.physics = p_1;
          };
        }
      });
      applyPhysics(s1, opt2, BABYLON.PhysicsImpostor.SphereImpostor);
      applyPhysics(s2, opt2, BABYLON.PhysicsImpostor.SphereImpostor);
      applyPhysics(dice, opt2, BABYLON.PhysicsImpostor.BoxImpostor);
      applyPhysics(nappula, opt2, BABYLON.PhysicsImpostor.BoxImpostor);
      applyPhysics(n2, opt2, BABYLON.PhysicsImpostor.BoxImpostor);
      applyPhysics(n3, opt2, BABYLON.PhysicsImpostor.BoxImpostor);
      let all_chips = [];
      const luo_merkki = ((x, y, z, size) => { 
        const merkki = BABYLON.MeshBuilder.CreateTube("tube", {path: [(new BABYLON.Vector3(0.0, -0.1,0.0)), (new BABYLON.Vector3(0.0, 0.1,0.0))], radiusFunction:((i, distance) => { 
          return size * 1.0;
        }), cap:BABYLON.Mesh.CAP_ALL}, scene);
        merkki.translate(new BABYLON.Vector3(x, y,z), 1, BABYLON.Space.WORLD ) ;
        applyPhysics(merkki, opt2, BABYLON.PhysicsImpostor.BoxImpostor);
        merkki.material  = orangeMaterial;
        all_chips.push(merkki);
      });
      luo_merkki(3.0, 3.0, 3.0, 1.0);
      luo_merkki(3.0, 3.3, 3.0, 1.0);
      luo_merkki(3.0, 3.6, 3.0, 1.0);
      luo_merkki(-3.0, 3.0, 3.0, 1.0);
      luo_merkki(-3.0, 3.3, 3.0, 1.0);
      luo_merkki(-3.0, 3.6, 3.0, 1.0);
      const create_card = ((x, y, z) => { 
        const card = BABYLON.MeshBuilder.CreateBox("card", {width:3.0, height:0.1, depth:5.0}, scene);
        card.translate(new BABYLON.Vector3(x, z,y), 1, BABYLON.Space.WORLD ) ;
        card.data = new ObjMeta();
        applyPhysics(card, opt3, BABYLON.PhysicsImpostor.BoxImpostor);
        card.material  = cardMaterial;
        card.rotationQuaternion = new BABYLON.Quaternion.RotationAxis((new BABYLON.Vector3(1.0, 1.0,1.0)), (0.5 * (Math.sin(z))));
      });
      const create_chips = ((n) => { 
        let cnt = n;
        while (cnt > 0) {
          const new_c = ((cnt) => { 
            setTimeout( () => {luo_merkki(3.0, 10.0, 3.0 + (0.1 * (cnt)), 1.0);
            } , 100 * cnt);
          });
          new_c(cnt);
          cnt = cnt - 1;
        };
      });
      let cnt_1 = 10;
      while (cnt_1 > 0) {
        const new_card = ((cnt) => { 
          setTimeout( () => {const rn = Math.sin(((cnt) * 0.1));
          const x = -4.3 + ((cnt) * 0.3);
          /** unused:  const y = -4.3 + rn   **/ 
          create_card(x, -6.3, 11.0 + rn);
          create_card(x, -6.3, 11.0 + rn);
          } , 100 * cnt);
        });
        new_card(cnt_1);
        cnt_1 = cnt_1 - 1;
      };
      /** unused:  const rot = 0.0   **/ 
      const direction = 1.0;
      let last_i = 0.0;
      let last_j = 0.0;
      let last_k = 0.0;
      let highlightCnt = 0;
      engine.runRenderLoop(()=>{
        ((() => { 
          time = time + (0.01 * direction);
          if ( diceStabileCnt > 0 ) {
            const WM = dice.getWorldMatrix();
            const i = WM.m[0 * 4 + 1];
            const j = WM.m[1 * 4 + 1];
            const k = WM.m[2 * 4 + 1];
            if ( (((Math.abs((i - last_i))) < 0.01) && ((Math.abs((j - last_j))) < 0.01)) && ((Math.abs((k - last_k))) < 0.01) ) {
              diceStabileCnt = diceStabileCnt - 1;
            }
            last_i = i;
            last_j = j;
            last_k = k;
            if ( diceStabileCnt == 0 ) {
              const diffAmount = 0.3;
              if ( diceThrow ) {
                const getDiceValue = (() => { 
                  if ( (((Math.abs((1.0 - i))) < diffAmount) && ((Math.abs((0.0 - j))) < diffAmount)) && ((Math.abs((0.0 - k))) < diffAmount) ) {
                    return 1;
                  }
                  if ( (((Math.abs((0.0 - i))) < diffAmount) && ((Math.abs((1.0 - j))) < diffAmount)) && ((Math.abs((0.0 - k))) < diffAmount) ) {
                    return 5;
                  }
                  if ( (((Math.abs((0.0 - i))) < diffAmount) && ((Math.abs((0.0 - j))) < diffAmount)) && ((Math.abs((1.0 - k))) < diffAmount) ) {
                    return 3;
                  }
                  if ( (((Math.abs((-1.0 - i))) < diffAmount) && ((Math.abs((0.0 - j))) < diffAmount)) && ((Math.abs((0.0 - k))) < diffAmount) ) {
                    return 6;
                  }
                  if ( (((Math.abs((0.0 - i))) < diffAmount) && ((Math.abs((-1.0 - j))) < diffAmount)) && ((Math.abs((0.0 - k))) < diffAmount) ) {
                    return 4;
                  }
                  if ( (((Math.abs((0.0 - i))) < diffAmount) && ((Math.abs((0.0 - j))) < diffAmount)) && ((Math.abs((-1.0 - k))) < diffAmount) ) {
                    return 2;
                  }
                  return 0;
                });
                const value = getDiceValue();
                if ( (value > 0) && (value < 6) ) {
                  create_chips(value);
                  switch (value ) { 
                    case 1 : 
                      hl_layer.addMesh(dice, new BABYLON.Color3(0.0, 0.8, 0.0));
                      break;
                    case 2 : 
                      hl_layer.addMesh(dice, new BABYLON.Color3(0.4, 0.8, 0.0));
                      break;
                    case 3 : 
                      hl_layer.addMesh(dice, new BABYLON.Color3(0.4, 0.4, 0.9));
                      break;
                    case 4 : 
                      hl_layer.addMesh(dice, new BABYLON.Color3(0.9, 0.4, 0.9));
                      break;
                    case 5 : 
                      hl_layer.addMesh(dice, new BABYLON.Color3(0.9, 0.9, 0.4));
                      break;
                  };
                  highlightCnt = 50;
                }
                if ( value == 6 ) {
                  hl_layer.addMesh(dice, new BABYLON.Color3(1.0, 0.0, 0.0));
                  highlightCnt = 100;
                  all_chips.forEach(((item, index) => { 
                    const meta_2 = item.data;
                    if ( (typeof(meta_2) !== "undefined" && meta_2 != null )  ) {
                      if( meta_2 instanceof ObjMeta ) /* union case */ {
                        var data_2 = meta_2;
                        if ( (typeof(data_2.physics) !== "undefined" && data_2.physics != null )  ) {
                          data_2.physics.applyImpulse(new BABYLON.Vector3(0, 30, 0), (item.getAbsolutePosition()).add((new BABYLON.Vector3(0.1, 0.1,0.1))) ) ;
                        }
                      };
                    }
                  }));
                }
                diceThrow = false;
              }
            }
          }
          if ( highlightCnt > 0 ) {
            highlightCnt = highlightCnt - 1;
            if ( highlightCnt == 0 ) {
              hl_layer.removeMesh(dice);
            }
          }
          scene.render();
        })) () 
       });
    }))(_task)
      }
      loader.load();
    }
    __js_main();
