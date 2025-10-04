#!/usr/bin/env node
// Simple Node version preflight: ensure Node major >= 18 unless SKIP_NODE_CHECK=1
const nodeMajor = Number(process.versions.node.split('.')[0]);
const required = 18;
if (process.env.SKIP_NODE_CHECK === '1') {
  console.log('SKIP_NODE_CHECK=1 set — skipping Node version check.');
  process.exit(0);
}
if (nodeMajor < required) {
  console.error(`Node ${process.versions.node} detected — this project requires Node >= ${required}.`);
  console.error('To override and continue anyway set SKIP_NODE_CHECK=1');
  process.exit(1);
}
process.exit(0);
