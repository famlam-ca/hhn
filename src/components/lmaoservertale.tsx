<TableBody>
  {/* NPM */}
  <TableRow key={data.serverName}>
    <TableCell
      className={
        data.status === "running"
          ? "capitalize text-success max-sm:hidden"
          : "capitalize text-alert max-sm:hidden"
      }
    >
      {data.status}
    </TableCell>

    <TableCell className="capitalize">{data.serverName}</TableCell>

    <TableCell
      className={
        parseFloat(data.cpuUsage) <= 50
          ? "text-success"
          : parseFloat(data.cpuUsage) > 50
            ? "text-warning"
            : parseFloat(data.cpuUsage) >= 75
              ? "text-alert"
              : "text-text"
      }
    >
      {data.cpuUsage}
    </TableCell>

    <TableCell
      className={
        parseFloat(data.memoryUsage) <= 50 // 2048
          ? "text-success"
          : parseFloat(data.memoryUsage) > 50 // 4096
            ? "text-warning"
            : parseFloat(data.memoryUsage) >= 75 // 6144
              ? "text-alert"
              : "text-text"
      }
    >
      {data.memoryUsage} MB
    </TableCell>

    <TableCell className="max-lg:hidden">{data.uptime}</TableCell>

    <TableCell className="text-right text-primary max-lg:hidden"></TableCell>
  </TableRow>

  {/* GS01 */}
  <TableRow key={data.serverName}>
    <TableCell
      className={
        data.status === "running"
          ? "capitalize text-success max-sm:hidden"
          : "capitalize text-alert max-sm:hidden"
      }
    >
      {data.status}
    </TableCell>

    <TableCell className="capitalize">{data.serverName}</TableCell>
    <TableCell
      className={
        parseFloat(data.cpuUsage) <= 50
          ? "text-success"
          : parseFloat(data.cpuUsage) > 50
            ? "text-warning"
            : parseFloat(data.cpuUsage) >= 75
              ? "text-alert"
              : "text-text"
      }
    >
      {data.cpuUsage}
    </TableCell>
    <TableCell
      className={
        parseFloat(data.memoryUsage) <= 50 // 2048
          ? "text-success"
          : parseFloat(data.memoryUsage) > 50 // 4096
            ? "text-warning"
            : parseFloat(data.memoryUsage) >= 75 // 6144
              ? "text-alert"
              : "text-text"
      }
    >
      {data.memoryUsage} MB
    </TableCell>
    <TableCell className="max-lg:hidden">{data.uptime}</TableCell>
    <TableCell className="text-right text-primary max-lg:hidden"></TableCell>
  </TableRow>

  {/* GS02 */}
  <TableRow key={data.serverName}>
    <TableCell
      className={
        data.status === "running"
          ? "capitalize text-success max-sm:hidden"
          : "capitalize text-alert max-sm:hidden"
      }
    >
      {data.status}
    </TableCell>

    <TableCell className="capitalize">{data.serverName}</TableCell>
    <TableCell
      className={
        parseFloat(data.cpuUsage) <= 50
          ? "text-success"
          : parseFloat(data.cpuUsage) > 50
            ? "text-warning"
            : parseFloat(data.cpuUsage) >= 75
              ? "text-alert"
              : "text-text"
      }
    >
      {data.cpuUsage}
    </TableCell>
    <TableCell
      className={
        parseFloat(data.memoryUsage) <= 50 // 2048
          ? "text-success"
          : parseFloat(data.memoryUsage) > 50 // 4096
            ? "text-warning"
            : parseFloat(data.memoryUsage) >= 75 // 6144
              ? "text-alert"
              : "text-text"
      }
    >
      {data.memoryUsage} MB
    </TableCell>
    <TableCell className="max-lg:hidden">{data.uptime}</TableCell>
    <TableCell className="text-right text-primary max-lg:hidden"></TableCell>
  </TableRow>

  {/* MailSrv */}
  <TableRow key={data.serverName}>
    <TableCell
      className={
        data.status === "running"
          ? "capitalize text-success max-sm:hidden"
          : "capitalize text-alert max-sm:hidden"
      }
    >
      {data.status}
    </TableCell>

    <TableCell className="capitalize">{data.serverName}</TableCell>
    <TableCell
      className={
        parseFloat(data.cpuUsage) <= 50
          ? "text-success"
          : parseFloat(data.cpuUsage) > 50
            ? "text-warning"
            : parseFloat(data.cpuUsage) >= 75
              ? "text-alert"
              : "text-text"
      }
    >
      {data.cpuUsage}
    </TableCell>
    <TableCell
      className={
        parseFloat(data.memoryUsage) <= 50 // 2048
          ? "text-success"
          : parseFloat(data.memoryUsage) > 50 // 4096
            ? "text-warning"
            : parseFloat(data.memoryUsage) >= 75 // 6144
              ? "text-alert"
              : "text-text"
      }
    >
      {data.memoryUsage} MB
    </TableCell>
    <TableCell className="max-lg:hidden">{data.uptime}</TableCell>
    <TableCell className="text-right text-primary max-lg:hidden"></TableCell>
  </TableRow>

  {/* WebSrv */}
  <TableRow key={data.serverName}>
    <TableCell
      className={
        data.status === "running"
          ? "capitalize text-success max-sm:hidden"
          : "capitalize text-alert max-sm:hidden"
      }
    >
      {data.status}
    </TableCell>

    <TableCell className="capitalize">{data.serverName}</TableCell>
    <TableCell
      className={
        parseFloat(data.cpuUsage) <= 50
          ? "text-success"
          : parseFloat(data.cpuUsage) > 50
            ? "text-warning"
            : parseFloat(data.cpuUsage) >= 75
              ? "text-alert"
              : "text-text"
      }
    >
      {data.cpuUsage}
    </TableCell>
    <TableCell
      className={
        parseFloat(data.memoryUsage) <= 50 // 2048
          ? "text-success"
          : parseFloat(data.memoryUsage) > 50 // 4096
            ? "text-warning"
            : parseFloat(data.memoryUsage) >= 75 // 6144
              ? "text-alert"
              : "text-text"
      }
    >
      {data.memoryUsage} MB
    </TableCell>
    <TableCell className="max-lg:hidden">{data.uptime}</TableCell>
    <TableCell className="text-right text-primary max-lg:hidden"></TableCell>
  </TableRow>

  {/* SQL-DB */}
  <TableRow key={data.serverName}>
    <TableCell
      className={
        data.status === "running"
          ? "capitalize text-success max-sm:hidden"
          : "capitalize text-alert max-sm:hidden"
      }
    >
      {data.status}
    </TableCell>

    <TableCell className="capitalize">{data.serverName}</TableCell>
    <TableCell
      className={
        parseFloat(data.cpuUsage) <= 50
          ? "text-success"
          : parseFloat(data.cpuUsage) > 50
            ? "text-warning"
            : parseFloat(data.cpuUsage) >= 75
              ? "text-alert"
              : "text-text"
      }
    >
      {data.cpuUsage}
    </TableCell>
    <TableCell
      className={
        parseFloat(data.memoryUsage) <= 50 // 2048
          ? "text-success"
          : parseFloat(data.memoryUsage) > 50 // 4096
            ? "text-warning"
            : parseFloat(data.memoryUsage) >= 75 // 6144
              ? "text-alert"
              : "text-text"
      }
    >
      {data.memoryUsage} MB
    </TableCell>
    <TableCell className="max-lg:hidden">{data.uptime}</TableCell>
    <TableCell className="text-right text-primary max-lg:hidden"></TableCell>
  </TableRow>

  {/* PrintSrv */}
  <TableRow key={data.serverName}>
    <TableCell
      className={
        data.status === "running"
          ? "capitalize text-success max-sm:hidden"
          : "capitalize text-alert max-sm:hidden"
      }
    >
      {data.status}
    </TableCell>

    <TableCell className="capitalize">{data.serverName}</TableCell>
    <TableCell
      className={
        parseFloat(data.cpuUsage) <= 50
          ? "text-success"
          : parseFloat(data.cpuUsage) > 50
            ? "text-warning"
            : parseFloat(data.cpuUsage) >= 75
              ? "text-alert"
              : "text-text"
      }
    >
      {data.cpuUsage}
    </TableCell>
    <TableCell
      className={
        parseFloat(data.memoryUsage) <= 50 // 2048
          ? "text-success"
          : parseFloat(data.memoryUsage) > 50 // 4096
            ? "text-warning"
            : parseFloat(data.memoryUsage) >= 75 // 6144
              ? "text-alert"
              : "text-text"
      }
    >
      {data.memoryUsage} MB
    </TableCell>
    <TableCell className="max-lg:hidden">{data.uptime}</TableCell>
    <TableCell className="text-right text-primary max-lg:hidden"></TableCell>
  </TableRow>

  {/* DNS */}
  <TableRow key={data.serverName}>
    <TableCell
      className={
        data.status === "running"
          ? "capitalize text-success max-sm:hidden"
          : "capitalize text-alert max-sm:hidden"
      }
    >
      {data.status}
    </TableCell>

    <TableCell className="capitalize">{data.serverName}</TableCell>
    <TableCell
      className={
        parseFloat(data.cpuUsage) <= 50
          ? "text-success"
          : parseFloat(data.cpuUsage) > 50
            ? "text-warning"
            : parseFloat(data.cpuUsage) >= 75
              ? "text-alert"
              : "text-text"
      }
    >
      {data.cpuUsage}
    </TableCell>
    <TableCell
      className={
        parseFloat(data.memoryUsage) <= 50 // 2048
          ? "text-success"
          : parseFloat(data.memoryUsage) > 50 // 4096
            ? "text-warning"
            : parseFloat(data.memoryUsage) >= 75 // 6144
              ? "text-alert"
              : "text-text"
      }
    >
      {data.memoryUsage} MB
    </TableCell>
    <TableCell className="max-lg:hidden">{data.uptime}</TableCell>
    <TableCell className="text-right text-primary max-lg:hidden"></TableCell>
  </TableRow>
</TableBody>;
