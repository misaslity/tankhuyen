import { get } from "lodash";
import { Fragment } from "react";
import { useQuery } from "@apollo/client";
import {
  Box,
  Flex,
  Text,
  Link,
  VStack,
  Heading,
  Container,
  SimpleGrid,
  AspectRatio,
  Icon,
} from "@chakra-ui/react";
import { BiCompass, BiPhone, BiLogoFacebook, BiLogoYoutube } from "react-icons/bi";

import Image from "@/components/Image";
import { GET_GENERAL_INFO } from "@/queries";
import { Blockcode_Generalinfo } from "@/__generated__/graphql";

const Footer = () => {
  const { data } = useQuery(GET_GENERAL_INFO);

  const generalInfo = get(data, "blockcodes.nodes[0].generalInfo") as
    | Blockcode_Generalinfo
    | undefined;

  if (generalInfo == undefined) return null;

  const { map, hotline, address, youtube, facebook } = generalInfo;

  return (
    <Box
      paddingTop={{ base: 10, lg: 20 }}
      bgColor="primary.950"
      color="white"
      position="relative"
      overflow="hidden"
    >
      <Container maxWidth="container.xl" zIndex="99" position="relative">
        <SimpleGrid columns={{ base: 1, lg: 3 }} gap={4}>
          <Box>
            <BlockLeft {...generalInfo} />
          </Box>
          <Box>
            <VStack alignItems="flex-start" gap={8}>
              <Heading size="md" className="underline">
                Thông tin liên hệ
              </Heading>
              <Flex alignItems="center" gap={2}>
                <Icon as={BiCompass} boxSize={6} />
                <Text>
                  <Text as="span" fontWeight="semibold">
                    Địa Chỉ:{" "}
                  </Text>
                  {address}
                </Text>
              </Flex>

              <Flex alignItems="center" gap={2}>
                <Icon as={BiLogoFacebook} boxSize={6} />
                <Text>
                  <Text as="span" fontWeight="semibold">
                    {"Facebook: "}
                  </Text>
                  <Link href={facebook ?? "#"} target="_blank" color="primary.500">
                    Huấn Luyện Chó Tân Khuyển
                  </Link>
                </Text>
              </Flex>
              <Flex alignItems="center" gap={2}>
                <Icon as={BiLogoYoutube} boxSize={6} />
                <Text>
                  <Text as="span" fontWeight="semibold">
                    {"Youtube: "}
                  </Text>
                  <Link href={youtube ?? "#"} target="_blank" color="primary.500">
                    @tankhuyencenter
                  </Link>
                </Text>
              </Flex>
              <Flex alignItems="center" gap={2}>
                <Icon as={BiPhone} boxSize={6} />
                <Text>
                  <Text as="span" fontWeight="semibold">
                    {"Hotline: "}
                  </Text>
                  <Link href={`tel:${hotline}`} color="primary.500">
                    {hotline}
                  </Link>
                </Text>
              </Flex>
            </VStack>
          </Box>
          <Box>
            <AspectRatio
              ratio={1}
              maxWidth={{
                base: "full",
                sm: "75%",
                md: "50%",
                lg: "full",
              }}
            >
              <Box
                dangerouslySetInnerHTML={{
                  __html: map!,
                }}
              />
            </AspectRatio>
          </Box>
        </SimpleGrid>
        <Box paddingY={4}>
          <Text textAlign="center">
            Copyright 2023 © Do it with our heart{" "}
            <Text as="span" color="red.500">
              ♥
            </Text>
          </Text>
        </Box>
      </Container>
      <Decorator />
    </Box>
  );
};

const BlockLeft = (props: Blockcode_Generalinfo) => {
  const { alternativelogo, description } = props!;

  const { sourceUrl, altText, mediaDetails } = alternativelogo!;

  return (
    <Flex direction={"column"} rowGap={4}>
      <Box maxWidth={400}>
        <Image
          src={sourceUrl!}
          alt={altText!}
          aspectRatio={mediaDetails?.width! / mediaDetails?.height!}
        />
      </Box>

      <Text>{description}</Text>
    </Flex>
  );
};

export default Footer;

const Decorator = () => {
  return (
    <Fragment>
      <Box
        position="absolute"
        bottom="-50%"
        left={0}
        width="full"
        height="full"
        backgroundRepeat="no-repeat"
        pointerEvents="none"
        style={{
          backgroundImage: backgroundImage,
        }}
      />

      <Box
        position="absolute"
        top="-45%"
        right={0}
        width="full"
        height="full"
        backgroundRepeat="no-repeat"
        backgroundPosition="right"
        pointerEvents="none"
        style={{
          backgroundImage: backgroundImage,
        }}
      />
    </Fragment>
  );
};

const backgroundImage = `url('data:image/svg+xml,<svg version="1.0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 672 1280"><g transform="translate(0,1280) scale(0.1,-0.1)" fill="white" opacity="0.1" stroke="none"><path d="M4753 12785 c-178 -55 -319 -257 -354 -508 -28 -199 54 -417 180 -479 70 -35 167 -32 245 6 79 39 172 133 218 221 139 267 121 561 -43 709 -72 65 -150 81 -246 51z"/><path d="M5589 12311 c-159 -51 -317 -195 -401 -366 -39 -79 -53 -143 -53 -240 0 -82 3 -97 33 -157 58 -119 124 -154 274 -145 76 4 97 10 175 47 73 35 103 58 173 129 88 88 133 159 181 286 30 79 32 206 5 285 -26 74 -103 152 -168 168 -66 17 -153 14 -219 -7z"/><path d="M3797 12306 c-104 -37 -198 -166 -242 -331 -19 -72 -22 -230 -5 -300 33 -134 136 -277 226 -311 92 -35 215 4 294 93 91 103 140 243 140 398 0 265 -139 466 -320 464 -30 0 -72 -6 -93 -13z"/><path d="M4325 11339 c-138 -21 -303 -92 -468 -203 -184 -123 -354 -297 -382 -389 -43 -144 14 -281 144 -346 68 -34 150 -55 296 -76 150 -22 229 -40 304 -70 122 -50 179 -98 327 -275 63 -76 132 -150 153 -164 118 -82 269 -88 350 -13 99 92 143 295 121 567 -23 296 -58 447 -142 620 -62 128 -142 214 -255 273 -125 66 -311 97 -448 76z"/><path d="M5752 11296 c-106 -26 -201 -82 -293 -175 -114 -115 -160 -204 -167 -321 -6 -105 10 -158 64 -219 33 -37 57 -52 101 -67 227 -74 518 77 646 335 40 81 42 88 42 180 0 88 -3 101 -30 150 -17 30 -46 64 -66 78 -75 49 -190 64 -297 39z"/><path d="M5350 8496 c-85 -18 -129 -44 -200 -116 -72 -72 -134 -184 -166 -300 -26 -92 -26 -275 0 -350 37 -111 104 -201 171 -231 65 -30 157 -25 233 11 254 120 393 541 267 807 -69 148 -171 207 -305 179z"/><path d="M6210 8030 c-217 -39 -441 -264 -496 -497 -21 -90 -15 -201 16 -271 33 -76 104 -137 177 -152 237 -50 517 151 628 451 51 135 35 285 -40 383 -52 68 -177 106 -285 86z"/><path d="M4390 8021 c-194 -63 -326 -359 -276 -616 29 -145 115 -279 212 -326 38 -18 57 -21 112 -17 80 6 132 30 188 90 95 98 144 221 151 378 8 157 -32 292 -119 402 -53 67 -193 114 -268 89z"/><path d="M1310 7517 c-122 -35 -219 -120 -287 -253 -117 -226 -118 -470 -2 -643 59 -89 110 -116 214 -116 68 0 88 5 135 29 247 129 382 543 261 802 -70 149 -192 218 -321 181z"/><path d="M2153 7046 c-204 -52 -407 -263 -463 -481 -24 -94 -25 -160 -4 -234 20 -71 58 -127 113 -166 38 -27 52 -30 132 -33 69 -3 104 1 157 17 174 53 333 213 414 416 27 68 32 93 32 170 1 110 -19 175 -74 238 -22 25 -59 52 -82 62 -56 22 -161 28 -225 11z"/><path d="M344 7037 c-151 -57 -266 -270 -266 -492 0 -157 49 -289 143 -384 62 -63 119 -86 199 -78 74 6 131 38 194 108 89 99 136 235 136 394 0 155 -46 287 -132 380 -66 73 -188 104 -274 72z"/><path d="M4840 7036 c-199 -42 -468 -204 -655 -393 -116 -117 -147 -170 -153 -261 -8 -117 35 -204 128 -260 76 -45 153 -67 326 -92 329 -46 420 -96 628 -344 121 -144 150 -170 216 -200 186 -84 331 -4 391 216 22 82 27 247 13 413 -23 272 -58 418 -139 584 -78 160 -210 271 -383 323 -87 26 -280 33 -372 14z"/><path d="M6305 6999 c-144 -48 -261 -131 -347 -247 -165 -223 -127 -478 81 -536 169 -47 352 14 507 169 64 64 90 100 125 170 43 86 44 91 43 179 -1 139 -47 217 -150 256 -60 22 -203 27 -259 9z"/><path d="M780 6050 c-98 -25 -311 -133 -430 -218 -115 -82 -275 -241 -314 -311 -72 -133 -28 -302 99 -381 60 -37 147 -60 335 -90 336 -53 410 -94 614 -339 159 -190 224 -233 354 -232 208 2 304 222 272 625 -45 579 -204 855 -543 943 -115 30 -276 31 -387 3z"/><path d="M2323 6029 c-162 -28 -320 -140 -423 -300 -48 -74 -70 -147 -70 -231 0 -166 89 -258 265 -274 179 -17 403 113 519 300 104 167 101 340 -6 443 -58 56 -176 82 -285 62z"/><path d="M2299 3031 c-112 -44 -194 -128 -260 -266 -115 -241 -99 -498 41 -658 22 -25 59 -52 82 -62 251 -101 536 211 540 590 1 139 -28 231 -103 325 -67 83 -193 113 -300 71z"/><path d="M1397 2569 c-61 -14 -92 -35 -145 -95 -94 -105 -145 -244 -145 -399 -1 -152 43 -278 129 -374 63 -70 111 -93 189 -93 282 2 455 459 294 776 -17 34 -44 78 -61 98 -53 67 -175 108 -261 87z"/><path d="M3141 2560 c-125 -46 -246 -145 -331 -270 -192 -283 -118 -619 139 -638 229 -17 476 170 582 440 74 189 24 392 -115 466 -50 26 -207 27 -275 2z"/><path d="M1878 1590 c-137 -25 -291 -94 -463 -208 -118 -78 -321 -273 -355 -342 -28 -56 -38 -161 -20 -216 48 -147 152 -202 461 -248 321 -48 406 -94 611 -338 123 -146 148 -170 217 -204 71 -35 185 -40 240 -10 160 86 211 359 150 796 -38 278 -115 465 -244 596 -76 77 -170 131 -280 159 -71 19 -251 28 -317 15z"/><path d="M3303 1545 c-146 -40 -289 -152 -382 -300 -92 -145 -83 -337 20 -430 103 -92 317 -85 487 17 120 73 241 225 276 347 48 166 -16 320 -153 364 -64 21 -175 21 -248 2z"/></g></svg>')`;
