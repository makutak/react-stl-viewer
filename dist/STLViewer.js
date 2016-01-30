'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _Three = require('./Three');

var _Three2 = _interopRequireDefault(_Three);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var STLViewer = function (_Component) {
  _inherits(STLViewer, _Component);

  function STLViewer() {
    _classCallCheck(this, STLViewer);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(STLViewer).apply(this, arguments));
  }

  _createClass(STLViewer, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var camera = undefined,
          scene = undefined,
          renderer = undefined,
          mesh = undefined,
          distance = undefined;
      var _props = this.props;
      var url = _props.url;
      var xDims = _props.xDims;
      var yDims = _props.yDims;
      var zDims = _props.zDims;
      var width = _props.width;
      var height = _props.height;
      var modelColor = _props.modelColor;
      var backgroundColor = _props.backgroundColor;

      var component = this;

      init();
      animate();

      /**
       * The init method for the 3D scene
       * @returns {void}
       */
      function init() {
        //Detector.addGetWebGLMessage();
        scene = new _Three2.default.Scene();
        distance = 10000;
        camera = new _Three2.default.PerspectiveCamera(30, width / height, 1, distance);

        camera.position.set(0, 0, Math.max(xDims * 3, yDims * 3, zDims * 3));

        scene.add(camera);
        var directionalLight = new _Three2.default.DirectionalLight(0xffffff);
        directionalLight.position.x = 0;
        directionalLight.position.y = 0;
        directionalLight.position.z = 1;
        directionalLight.position.normalize();
        scene.add(directionalLight);

        var loader = new _Three2.default.STLLoader();
        loader.load(url, function (geometry) {
          mesh = new _Three2.default.Mesh(geometry, new _Three2.default.MeshLambertMaterial({
            overdraw: true,
            color: modelColor
          }));

          mesh.rotation.x = 5;
          mesh.rotation.z = .25;
          //mesh.scale.set( scale, scale, scale );
          scene.add(mesh);
        });

        renderer = new _Three2.default.WebGLRenderer(); //new THREE.CanvasRenderer();
        renderer.setSize(width, height);
        renderer.setClearColor(backgroundColor, 1);

        // Add to the React Component
        _reactDom2.default.findDOMNode(component).appendChild(renderer.domElement);
      }

      /**
       * Animate the scene
       * @returns {void}
       */
      function animate() {
        // note: three.js includes requestAnimationFrame shim
        requestAnimationFrame(animate);
        render();
      }

      /**
       * Render the scene
       * @returns {void}
       */
      function render() {
        if (mesh) {
          mesh.rotation.z += 0.02;
        }

        renderer.render(scene, camera);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement('div', { className: this.props.className });
    }
  }]);

  return STLViewer;
}(_react.Component);

STLViewer.propTypes = {
  className: _react.PropTypes.string,
  url: _react.PropTypes.string,
  xDims: _react.PropTypes.number,
  yDims: _react.PropTypes.number,
  zDims: _react.PropTypes.number,
  width: _react.PropTypes.number,
  height: _react.PropTypes.number,
  backgroundColor: _react.PropTypes.number,
  modelColor: _react.PropTypes.number
};
;

module.exports = STLViewer;