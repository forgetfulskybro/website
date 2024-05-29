type WakatimeRes = {
  data: {
    total_seconds: number;
  };
};

export interface WakaResponse {
  seconds: number;
}

export async function wakaData(): Promise<WakaResponse | undefined> {
  // try {
  //   const res: WakatimeRes = await fetch(
  //     "https://wakatime.com/api/v1/users/current/all_time_since_today",
  //     {
  //       headers: {
  //         Authorization: `Basic ${Buffer.from(
  //           String(process.env.WAKATIME_API_KEY)
  //         ).toString("base64")}`,
  //         "Content-Type": "application/json",
  //       },
  //     }
  //   ).then((response) => {
  //     if (!response.ok) {
  //       throw new Error(`There was an error while querying the Last.fm API.`);
  //     }

  //     return response.json();
  //   });

  //   return {
  //     seconds: res.data.total_seconds,
  //   };
  // } catch (error) {
  //   console.error(error);
  // }

  return {
    seconds: 4649806.059317,
  };
}
