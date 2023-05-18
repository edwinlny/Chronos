const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const PROTO_PATH = './reverseProxy.proto';
const Chronos = require('@chronosmicro/tracker');
const chronosConfig = require('./chronos-config');
const chronos = new Chronos(chronosConfig);

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  arrays: true,
});

const ProxyToBookService = grpc.loadPackageDefinition(packageDefinition).ProxyToBook;
const bookClient = new ProxyToBookService('localhost:30044', grpc.credentials.createInsecure());
const ClientWrapper = chronos.ClientWrapper(bookClient, ProxyToBookService);

module.exports = ClientWrapper;
