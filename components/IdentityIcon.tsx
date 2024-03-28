// import React, { useMemo } from 'react';
// import { Image } from 'react-native';
// import { identicon } from 'minidenticons';

// interface IdentityIconProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src'> {
//     username: string;
//     saturation?: string | number;
//     lightness?: string | number;
// }

// const IdentityIcon: React.FC<IdentityIconProps> = ({ username, saturation, lightness, ...props }) => {
//     const svgText = useMemo(() => identicon(username, saturation, lightness), [username, saturation, lightness]);
//     return <Image source={{ uri: `data:image/svg+xml;utf8,${encodeURIComponent(svgText)}` }} accessibilityLabel={username} {...props} />;
// };

// export default IdentityIcon;
import { minidenticon } from 'minidenticons'
import { useMemo } from 'react'
import { Image, StyleSheet } from 'react-native';
import {SvgXml} from 'react-native-svg';

const MinidenticonImg = ({ username, saturation, lightness, height, width}) => {
    // console.log(username, lightness, saturation);
  const svgURI = useMemo(() => minidenticon(username, saturation, lightness), [username, saturation, lightness]);
//   console.log(svgURI);
  return (
    <SvgXml
      xml={svgURI}
      width={width}
      height={height}
      style={styles.userImage}
    />
 );
};

const styles = StyleSheet.create({
 userImage: {
    borderRadius: 50,
 },
});

export default MinidenticonImg;

