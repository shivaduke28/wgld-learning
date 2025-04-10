gl = null;

const onLoad = () => {
    var c = document.getElementById("canvas");
    c.width = 500;
    c.height = 300;

    gl = c.getContext("webgl") || c.getContext("experimental-webgl");
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    const vs = createShader("vs");
    const fs = createShader("fs");
    const program = createProgram(vs, fs);

    // 時計周りで上、右、左
    const vertexPosition = [
        0.0, 1.0, 0.0,
        1.0, 0.0, 0.0,
        -1.0, 0.0, 0.0
    ];

    const vbo = createVbo(vertexPosition);
};

function createShader(id) {
    var shader;
    var scriptElement = document.getElementById(id);

    if (!scriptElement) return;

    switch (scriptElement.type) {
        case "x-shader/x-vertex":
            shader = gl.createShader(gl.VERTEX_SHADER);
            break;
        case "x-shader/x-fragment":
            shader = gl.createShader(gl.FRAGMENT_SHADER);
            break;
        default:
            return;
    }

    // shaderにtextを割り当てる
    gl.shaderSource(shader, scriptElement.text);
    // compile
    gl.compileShader(shader);

    if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        return shader;
    } else {
        alert(gl.getShaderInfoLog(shader));
    }
}

// vs->fsのデータを渡すのがprogram
function createProgram(vs, fs) {
    var program = gl.createProgram();
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);

    gl.linkProgram(program);

    if (gl.getProgramParameter(program, gl.LINK_STATUS)) {
        gl.useProgram(program);

        return program;
    } else {
        alert(gl.getProgramInfoLog(program));
    }
}

function createVbo(data) {
    var vbo = gl.createBuffer();

    // データをセットするためにbindが必要
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);
    // 終わったら解除する
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    return vbo;
}

document.addEventListener("DOMContentLoaded", onLoad);

