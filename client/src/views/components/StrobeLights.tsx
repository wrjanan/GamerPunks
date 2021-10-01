import React, { useRef, useEffect } from 'react';

const StrobeLights: React.FC = () => {
    let canvasRef = useRef<HTMLCanvasElement | null>(null);
    let canvasCtxRef = React.useRef<CanvasRenderingContext2D | null>(null);

    useEffect(() => {
        // Initialize
        if (canvasRef.current) {
            canvasCtxRef.current = canvasRef.current.getContext('2d');
            let c = canvasCtxRef.current;

            var fps = 60;
            var fpsInterval = 1000 / fps;
            var canvas = canvasRef.current
            var drag = false;
            var color = [
                '#334D5C',
                '#45B29D',
                '#EFC94C',
                '#E27A3F',
                '#DF5A49'
            ]
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            var scroll = {
                y: 0
            }
            var mouse = {
                x: 0,
                y: 0
            }

            function random(min: number, max: number) {
                return Math.floor(Math.random() * (max - min + 1) + min);
            }
            var radius = 5

            type Point = {
                x: number,
                y: number,
            };
            class StrobeLight {
                offset: number;
                hue: number;
                hueReverse: boolean;
                opacity: number;
                length: number;
                dashRadius: number[];
                paths: number[][];
                pos: Point;

                constructor(paths: number[][], length: number, dashRadius: number[], opacity: number) {
                    this.offset = 0;
                    this.hue = 210;
                    this.hueReverse = false;
                    this.opacity = opacity;
                    this.length = length;
                    this.dashRadius = dashRadius;

                    this.paths = [];
                    this.pos = {
                        x: 0,
                        y: 0
                    };
                    for (var i = 0; i < paths.length; i++) {
                        if (i == 0) {
                            this.pos = {
                                x: paths[i][0],
                                y: paths[i][1]
                            };
                        } else {
                            this.paths.push(paths[i])
                        }
                    }
                }

                changeColor() {
                    if (this.hueReverse) {
                        this.hue -= 0.5; // = (this.hue++ % 150) + 210;
                    } else {
                        this.hue += 0.5; // = (this.hue++ % 150) + 210;
                    }
                    if (this.hue == 360) {
                        this.hueReverse = true;
                    } else if (this.hue == 210) {
                        this.hueReverse = false;
                    }
                }

                update() {
                    this.offset--;
                }

                render() {
                    if (!c) { return }
                    // c.strokeStyle = this.color
                    c.setLineDash(this.dashRadius);
                    c.strokeStyle = 'hsla(' + this.hue + ', 100%, 50%, ' + this.opacity + ')';
                    c.shadowBlur = 7;
                    c.shadowColor = c.strokeStyle;
                    c.lineDashOffset = this.offset;
                    c.lineWidth = this.length
                    c.beginPath();
                    c.moveTo(this.pos.x, this.pos.y)

                    for (var path in this.paths) {
                        c.lineTo(this.paths[path][0], this.paths[path][1]);
                    }
                    c.stroke();                }
            }


            window.addEventListener("mousemove", function (event) {
                mouse.x = event.clientX;
                mouse.y = event.clientY;

                changeStrobeLightsColor();
            });
            window.addEventListener("wheel", function (event) {
                changeStrobeLightsColor();
            });

            /* ---- Functions ---- */

            var strobeLights: any[] = [];
            var dashRadius = [6, 6];
            var iL = Math.floor(canvas.width / 10); // inner left bound
            var iR = Math.floor(canvas.width - iL); // inner right bound
            var iT = Math.floor(canvas.height / 10); // inner top bound
            var iB = Math.floor(canvas.height - iT); // inner bottom bound
            var ptTL = [0, 0], // point at top left
            ptTR = [canvas.width, 0], // point at top right
            ptBR = [canvas.width, canvas.height], // point at bottom right
            ptBL = [0, canvas.height], // point at bottom left
            ptITL = [iL, iT], // point at inner top left
            ptITR = [iR, iT], // point at inner top right
            ptIBR = [iR, iB], // point at inner bottom right
            ptIBL = [iL, iB]; // point at inner bottom left
            strobeLights.push(new StrobeLight([ptTL, ptITL, ptITR], radius, dashRadius, 1))
            strobeLights.push(new StrobeLight([ptTR, ptITR, ptIBR], radius, dashRadius, 1))
            strobeLights.push(new StrobeLight([ptBR, ptIBR, ptIBL], radius, dashRadius, 1))
            strobeLights.push(new StrobeLight([ptBL, ptIBL, ptITL], radius, dashRadius, 1))
            var strobeLightRoom = [
                ptBL, ptIBL,
                ptITL, ptTL, ptITL,
                ptITR, ptTR, ptITR,
                ptIBR, ptBR, ptIBR,
                ptIBL]
            strobeLights.push(new StrobeLight(strobeLightRoom, radius, [0, 0], 0.42))

            const changeStrobeLightsColor = () => {
                for (var i = 0; i < strobeLights.length; i++) {
                    strobeLights[i].changeColor();
                }
            }

            if(!c) { return }

            c.fillStyle = "rgba(0,0,0,0.9)";
            c.fillRect(0, 0, canvas.width, canvas.height)
            c.fill();

            // function loop() {
            //   c.beginPath();
            //   c.fillStyle = "black";
            //   c.textAlign = "center";
            //   c.font = "80px Sans-serif";
            //   c.fillText("Move Mouse", canvas.width / 2, canvas.height / 2);
            //   c.closePath();
            //   for (var i = 0; i < circle.length; i++) {
            //     circle[i].update();
            //     circle[i].render();
            //   }

            //   requestAnimationFrame(loop);
            // }

            var then = Date.now();
            function loop() {
                if(!c) { return }
                const now = Date.now();
                const elapsed = now - then;

                if (elapsed > fpsInterval) {
                    then = now - (elapsed % fpsInterval);

                    c.fillStyle = "rgba(0,0,0,0.9)";
                    c.fillRect(0, 0, canvas.width, canvas.height)

                    for (var i = 0; i < strobeLights.length; i++) {
                        strobeLights[i].update();
                        strobeLights[i].render();
                    }
                }

                requestAnimationFrame(loop);
            }
            loop();

        }
    }, [canvasRef]);

    return <canvas style={{ maxHeight: '100vh', minHeight: '100vh', position: "fixed", zIndex: -10 }} id="jan" ref={canvasRef}></canvas>;
};

export default StrobeLights;