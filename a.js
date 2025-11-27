const { ec2Client } = require("@aws-sdk/client-ec2");
const ec2_client = new ec2Client();


ec2_client.createSecurityGroup({
  groupName: "launch-wizard-4",
  description: "launch-wizard-4 created 2025-11-27T23:43:49.930Z",
  vpcId: "vpc-0dea7aa121fd42ea5"
});

ec2_client.authorizeSecurityGroupIngress({
  groupId: "sg-preview-1",
  ipPermissions: [{ ipProtocol: "tcp", fromPort: 3389, toPort: 3389, ipRanges: [{ cidrIp: "0.0.0.0/0" }] }, { ipProtocol: "tcp", fromPort: 80, toPort: 80, ipRanges: [{ cidrIp: "0.0.0.0/0" }] }, { ipProtocol: "tcp", fromPort: 443, toPort: 443, ipRanges: [{ cidrIp: "0.0.0.0/0" }] }]
});

ec2_client.runInstances({
  maxCount: 1,
  minCount: 1,
  imageId: "ami-0325e1499e14d1d8f",
  instanceType: "m7i-flex.large",
  keyName: "hello",
  ebsOptimized: true,
  blockDeviceMappings: [{ deviceName: "/dev/sda1", ebs: { encrypted: false, deleteOnTermination: true, iops: 3000, snapshotId: "snap-05254133735fa9361", volumeSize: 128, volumeType: "gp3", throughput: 125 } }],
  networkInterfaces: [{ associatePublicIpAddress: true, deviceIndex: 0, groups: ["sg-preview-1"] }],
  tagSpecifications: [{ resourceType: "instance", tags: [{ key: "Name", value: "Bindows sever" }] }],
  metadataOptions: { httpEndpoint: "enabled", httpPutResponseHopLimit: 2, httpTokens: "required" },
  privateDnsNameOptions: { hostnameType: "ip-name", enableResourceNameDnsARecord: true, enableResourceNameDnsAAAARecord: false }
});
